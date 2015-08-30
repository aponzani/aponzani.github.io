$(document).ready(function () {
    $.each(theHistory.locations, function () {
        var $gpb = $('#grand-poobah').find('ul');
        $gpb.append('<li>' + this.poobah + "</li>");

        var $loc = $('#locations').find('ul');
        $loc.append('<li>' + this.name + "</li>");
    });
});
