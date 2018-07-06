export function offsetSizes(n: HTMLElement) {
    let r = n.getBoundingClientRect();
    return {
        w: r.width,
        h: r.height
    }
}