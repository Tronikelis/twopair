export default function withinMargin(a: number, b: number, margin: number): boolean {
    return Math.abs(a - b) < margin;
}
