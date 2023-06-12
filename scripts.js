window.onload = function() {
    new Sortable(document.getElementById('pollOptions'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
    });
}
