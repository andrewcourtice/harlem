# Tips

Here are some tips and tricks to get the most out of Harlem.

## Performance

Harlem is already built to be as performant as possible without sacrificing features or stability but here are a few tips for getting absolute peak performance out of Harlem. Bear in mind that in some circumstances there will be a trade-off between features/stability and performance.

### Mutation/Action payloads

It is recommended to keep mutation and action payload objects small. The default behaviour for Harlem is to deep clone payload objects that are passed into mutations and actions (or any extension that utilises the payload provider). The reason a deep clone is necessary is to prevent referenced or proxied objects being put on state and causing unintentional side-effects. In most cases this is fine, however, passing large object structures into mutations/actions will incur the cost of deep cloning those objects.

There are 2 ways to reduce this cost:

1. Keep payloads small. This is the easiest solution.
2. Specify a custom payload provider and ensure you never put referenced, proxied or reactive objects on state. This may not be ideal as it increases the mental burden placed on the developer to ensure mutations are type-safe.

### Extensions
Extensions are a fantasic and convenient way to add functionality to your store. Much like anything though, too much of a good thing can take a toll. Each extension you add to a store increases work being done on the store (depending on what the extension does). Not all extensions are equal in terms of size or performance cost. Here is a basic comparison of the official extensions and the costs associated with each one:

| Extension | Size Impact | Performance Impact (intialisation) | Performance Impact (runtime) |
| --------- | :---------: | :--------------------------------: | :--------------------------: |
| Action | Medium | Low | Medium |
| History | Medium | Low | Medium |
| Lazy | Low | Low | Low |
| Storage | Low | Low | Medium |
| Trace | Medium | Low | Medium |
| Transaction | Low | Low | Medium |

**Note:** a small size impact (minified) would be 0 - 1KB, medium 1KB - 5KB, high 5KB+ 

## Common Pitfalls

Here are some common pitfalls to avoid when using Harlem.

### Assigning referenced, reactive or proxied objects to state

Although Harlem clones payload objects to reduce the chance of this, it is still possible to assign referenced, reactive or proxied objects to state. This can be an issue if some code has a reference to that object and modifies it. By doing so this can cause unintended side effects to occur.