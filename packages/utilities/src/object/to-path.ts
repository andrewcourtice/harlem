export default function toPath(nodes: PropertyKey[]): string {
    return nodes.reduceRight((path, node) => {
        const nodeStr = node.toString();

        const segment = isNaN(parseInt(nodeStr, 10))
            ? `/${node.toString()}`
            : `[${node.toString()}]`;

        return segment + path.toString();
    }, '').toString();
}