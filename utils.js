/**
 * Created by tech4GT on 9/29/17.
 */
module.exports = {
    compare: function (a, b) {
        if (a.date > b.date)
            return 1
        else if (a.date < b.date)
            return -1
        else
            return 0
    }
}