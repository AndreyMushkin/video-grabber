;(function ($) {
    let $searchString = $("#search-string");
    let $videoLink = $("#link");
    let $videoBlock = $("#video");
    let $player = $(".player");

    function copyToClipboard() {
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val($videoLink.attr('href'));
        $temp.select();
        document.execCommand("copy");
        $temp.remove();
    }

    async function initSearch(event) {
        event.preventDefault();
        console.log($searchString.val());
        const response = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({
                'searchString': $searchString.val()
            })
        });

        if (response.ok) {
            let videoData = await response.json();
            $videoBlock.css('display', 'flex');
            $videoLink.attr('href', videoData.link);
            $videoLink.text(videoData.link);
            $player.attr('src', 'https://www.youtube.com/embed/' + videoData.code);
        } else {
            console.log('Search request failed');
        }
    }

    $("#search-form").on("submit", initSearch);
    $("#copy").on("click", copyToClipboard);

}(jQuery));
