const arr: string[] = ["#ffdc73", "#b6e8de", "#b2e5ff", "#fe9dad", "#f5bace"];
function chooseNonConsecutive() {
    if (arr.length < 2) {
        return null; // Not enough elements for non-consecutive selection
    }

    const firstChoice = arr[Math.floor(Math.random() * arr.length)];

    // Create a list of valid indices for the second choice, excluding consecutive indices
    const validIndices = arr.reduce((valid, _, i) => {
        if (arr[i] !== firstChoice && Math.abs(i - arr.indexOf(firstChoice)) !== 1) {
            // @ts-ignore
            valid.push(i);
        }
        return valid;
    }, []);

    // Choose the second element randomly from the valid indices
    const secondChoice =
        arr[validIndices[Math.floor(Math.random() * validIndices.length)]];

    return [firstChoice, secondChoice];
}

export default chooseNonConsecutive;
