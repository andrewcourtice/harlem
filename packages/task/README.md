# Task
The purpose of this package is to deliver a simple but flexible method of handling asynchronous code cancellation. The implementation is a `Task` class which is an extension of the built-in ES6 Promise class. The `Task` class extends the `Promise` constructor to support an `onAbort` callback and adds an `abort` method to the class instance. Internally the `Task` uses an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to manage cancellation and [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) instances as cancellation tokens between `Task` instances.

## Features

- Fully compatible with JavaScript's native `async/await` syntax.
- Uses an AbortController as a native cancellation token which enables fetch requests and certain DOM operations to be cancelled inside the task.
- Synchronise cancellation of child tasks by sharing the controller between task instances.

## Installation
```bash
# NPM
npm install @harlem/task

# Yarn
yard add @harlem/task

# Pnpm
pnpm install @harlem/task
```

## Usage

### Basic
```typescript
function createTask(message: string, timeout: number = 1000): Task<string> {
    // Create a new task the same way you create a promise
    return new Task((resolve, reject, controller, onAbort) => {
        const handle = window.setTimeout(() => resolve(message), 1000);

        /*
        Register an onAbort handler to instruct the task how to handle cancellation.
        This is also handy for cleaning up resources such as timer handles
        */
        onAbort(() => {
            window.clearTimeout(handle);
            reject();
        });
        
        /*
        The controller could be passed to any number of child tasks
        to synchronise the cancellation all the way through a chain
        of async operations.
        
        eg. new Task((resolve, reject, controller, onAbort) => {
            // Do some nested async operation
        }, controller);
        
        Note the second parameter to the Task constructor is an
        existing AbortController. Handy for passing controllers
        down to child tasks.
        */
    });
}

async function run(): Promise<void> {
    const task = createTask('hello');

    // Abort the task before it has a chance to complete
    window.setTimeout(() => task.abort(), 500);

    try {
        const result = await task;
        console.log(result);
    } catch {
        console.log('aborted');
    }
}
```

### Cancel Fetch Requests
```typescript
function getUserData(id: string): Task<object> {
    // Create a new task the same way you create a promise
    return new Task(async (resolve, reject, controller) => {
        try {
            /* 
            Pass the abort controller signal into the fetch api
            to cancel the request when the task is aborted
            */
            const response = await window.fetch(`/api/users/${id}`, {
                signal: controller.signal
            });

            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error)
        }
    });
}

async function run(): Promise<void> {
    const task = getUserData('some-id');

    // Abort the task before it has a chance to complete
    window.setTimeout(() => task.abort(), 100);

    try {
        const result = await task;
        console.log(result);
    } catch {
        console.log('aborted');
    }
}
```

## API Reference

### Constructor
```typescript
new Task((resolve, reject, controller, onAbort) => {}, controller);
```
**Arguments**
- **initialiser**: `Function` - A function to initialise the task. Same as the Promise initialiser with extra arguments (see below).
    - **resolve**: `Function` - Resolve the task with an optional response payload. Same as the Promise resolve method.
    - **reject**: `Function` - Reject the task with an optional reason. Same as the Promise reject method.
    - **controller**: `AbortController` - The `AbortController` instance used to cancel this task. This is useful for sharing with child tasks to synchronise cancellation.
    - **onAbort**: `Function` - Register a callback function to be called when this task instance is cancelled. This function accepts a single `reason` argument which is optionally supplied when the `abort` method is called on the task instance. This is particularly useful for performing cleanups.
- **controller**: `AbortController?` - An optional AbortController instance to use as the cancellation manager for this task. This is useful for passing parent controller instances to child tasks to synchronise cancellation.

Note: `?` indicates an optional value.


### Properties
All properties available on the standard [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance with the addition of:

- **signal**: `AbortSignal` - Readonly access to the underlying `AbortSignal` attached to this task instance.
- **hasAborted**: `Boolean` - A flag indicating whether this task instance has been aborted.


### Methods
All methods available on the standard [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance with the addition of:

- **abort**: `Function` - Abort this task instance (and any other tasks sharing this tasks's controller). The `abort` function accepts the following arguments:
    - **reason**: `Any?` - An optional reason for cancelling this task.