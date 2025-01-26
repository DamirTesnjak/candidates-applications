export default function addHTMLTags(args) {
    const { startTag, endTag, textAreaElementId } = args;
    const textAreaElement = document.getElementById(textAreaElementId)!;

    const startPos = textAreaElement.selectionStart;
    const endPos = textAreaElement.selectionEnd;

    const value = textAreaElement.value;
    const selectedText = textAreaElement.value.substring(startPos, endPos);
    const textWithAddedTags = startTag + selectedText + endTag;

    textAreaElement.value = value.substring(0, startPos) + textWithAddedTags +  value.substring(endPos);
    textAreaElement.selectionEnd = startPos + textWithAddedTags.length;
    return textAreaElement;
}