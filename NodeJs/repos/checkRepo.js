exports.isAdmin = (user) => {
    if (user == undefined) { return false}
    if (user.Role != 'Admin') { return false; }
    return true;
}