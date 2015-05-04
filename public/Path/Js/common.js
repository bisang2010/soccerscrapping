/* Mobile JS */

$(function() {
	/* 상단 주소창 감추기 */
	try {window.addEventListener('load', function() {
		setTimeout(scrollTo, 0, 0, 1);
		}, false);
	} catch(e) {}
});

$(function() {
	// /* tab style */
	// $( ".tabsLayer" ).tabs();

	// /* */
	// $( ".listAccordion" ).accordion();

	// /* input style */
	// $('.contents input').ezMark();

	/* 퀵메뉴 */
	$("#menuAllBtn").click(function() {
		$(".menuAll").fadeToggle("fast");
	});
});
