exports.isAdmin = (user) => {
    console.log(user);
    if (user == undefined) { return false}
    if (user.Role != "Admin") { return false; }
    return true;
}