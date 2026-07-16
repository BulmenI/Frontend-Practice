function groupByExperience(arr) {
    const groups = new Map();

    for (const employee of arr) {
        const exp = employee.experience; 
        if (groups.has(exp)) {
            groups.get(exp).push(employee.name);
        } else {
            groups.set(exp, [employee.name]);
        }
    }

    return groups;
}