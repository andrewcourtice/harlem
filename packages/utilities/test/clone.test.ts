import clone from '../src/clone';

function getSimpleTypes(): Record<string, any> {
    return {
        num: 1,
        und: undefined,
        func1: () => console.log('test'),
        func2: function (a: number, b: number) {
            return a + b;
        }
    };
}

function getComplexTypes(): Record<string, any> {
    const map = new Map();
    const set = new Set();

    map.set('key', 'value');
    set.add('value1');
    set.add('value2');

    return {
        obj: {
            a: 'test'
        },
        arr: [1, 2, 3],
        map,
        set,
        bool: new Boolean(true),
        num: new Number(2),
        str: new String(2),
        symbol: Object(Symbol(1)),
        date: new Date(),
        reg: /\d+/,
        error: new Error(),
    };
}

describe('Utilities', () => {

    describe('Clone', () => {
        
        test('Should deep clone an object with simple types', () => {
            const source = getSimpleTypes();
            const copy = clone(source);
            
            for (const key in source) {
                expect(copy[key]).toBe(source[key]);
            }
        });
    
        test('Should deep clone an object with complex types', () => {
            const source = getComplexTypes();
            const copy = clone(source);
            
            for (const key in source) {
                expect(copy[key]).not.toBe(source[key]);
            }
        });
    
    });
    
});
