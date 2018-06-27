exports.isAdmin = (user) => {
    if (user.Role != 'Admin') { return false; }
    return true;
}