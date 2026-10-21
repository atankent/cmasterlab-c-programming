function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('CMasterLab — Interactive C Programming Academy')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
