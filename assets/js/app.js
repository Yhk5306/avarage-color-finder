$('.example').on('click',function () {
    $(this).addClass('active-tab')
    $(this).siblings('.usage').removeClass('active-tab')
    $(this).parent('.tabs').siblings('.example-detail').show()
    $(this).parent('.tabs').siblings('.usage-area').hide()
})
$('.usage').on('click',function () {
    $(this).addClass('active-tab')
    $(this).siblings('.example').removeClass('active-tab')
    $(this).parent('.tabs').siblings('.usage-area').show()
    $(this).parent('.tabs').siblings('.example-detail').hide()
})