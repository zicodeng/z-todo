$(document).ready(function() {

    // Add a new to-do item
    $(".add-item-form").on("submit", function() {
        var item = $(".add-item-form input");
        var toDo = {
            item: item.val()
        };
        $.ajax({
            type: "POST",
            url: "/z-todo",
            data: toDo,

            // If POST success, reload the page, so new to-do item will be displayed
            success: function(data) {
                location.reload();
            }
        });

        return false;
    });

    // Delete a to-do item
    $(".to-do-item").on("click", function() {
        // Replace any space with hypen
        // e.g. make bed => make-bed
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: "DELETE",
            url: "/z-todo/" + item,
            success: function(data) {
                location.reload();
            }
        });
    });
});
