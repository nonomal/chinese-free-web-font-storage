import GitHubSlugger from 'github-slugger';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

function assocPath(path: string[], value: any, obj: any) {
    if (path.length === 0) return value;
    const [idx, ...tail] = path;
    const next = obj[idx] ? obj[idx] : typeof tail[0] === 'number' ? [] : {};
    return Object.assign(obj, { [idx]: assocPath(tail, value, next) });
}

export const remarkHeadId: Plugin<
    [
        {
            levels?: number[];
        },
    ]
> = ({ levels = [1, 2, 3, 4] }: { levels?: number[] } = {}) => {
    const updateProperties = <T>(data: Record<string, T>) => {
        return <N>(node: N): N => {
            for (const [key, value] of Object.entries(data)) {
                assocPath(['data', 'hProperties', key], value, node);
            }

            return node;
        };
    };

    const slugger = new GitHubSlugger();

    return (tree) => {
        visit(tree, 'heading', (node) => {
            const text = node.children[0];

            if (text?.type === 'text' && levels.includes(node.depth)) {
                const slug = slugger.slug(text.value);
                updateProperties({ id: slug })(node);
            }
        });
    };
};

export default remarkHeadId;
