/**
 * Converts value to thousands such that it looks nice and compact on user screen
 * 123 -> 123
 * 1234 -> 1.23k
 * 12345 -> 12.34k
 * 123456 -> 123.4k
 * 1234567 -> 1.23M
 *
 * using correct bigint math
 */
export const formatThousands = (value: bigint) => {
    if (value < 1000n) {
        return value.toString();
    }

    if (value < 10_000n) {
        return `${(value / 1000n).toString()}k`;
    }

    if (value < 100_000n) {
        return `${(value / 1000n).toString().slice(0, -1)}k`;
    }

    if (value < 1_000_000n) {
        return `${(value / 1000n).toString().slice(0, -2)}k`;
    }

    if (value < 10_000_000n) {
        return `${(value / 1_000_000n).toString()}M`;
    }

    if (value < 100_000_000n) {
        return `${(value / 1_000_000n).toString().slice(0, -1)}M`;
    }

    if (value < 1_000_000_000n) {
        return `${(value / 1_000_000n).toString().slice(0, -2)}M`;
    }

    if (value < 10_000_000_000n) {
        return `${(value / 1_000_000_000n).toString()}B`;
    }

    if (value < 100_000_000_000n) {
        return `${(value / 1_000_000_000n).toString().slice(0, -1)}B`;
    }

    if (value < 1_000_000_000_000n) {
        return `${(value / 1_000_000_000n).toString().slice(0, -2)}B`;
    }

    return value.toString();
};
