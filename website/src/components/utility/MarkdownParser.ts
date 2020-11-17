const formattedLinkRegex = /\[(.*?)\]\((.*?)\)/gim;
const linkRegex = /^(https?:\/{2}.*)/gim;
const paragraphRegex = /(.*?)\n$/gim;
const lineBreakRegex = /( {2}$)/gim;
const italicRegex = /\*(.*)\*/gim;
const boldRegex = /\*\*(.*)\*\*/gim;
const quoteRegex = /^\> (.*$)/gim;
const h1Regex = /^# (.*$)/gim;
const h2Regex = /^## (.*$)/gim;
const h3Regex = /^### (.*$)/gim;
const h4Regex = /^#### (.*$)/gim;
const h5Regex = /^##### (.*$)/gim;
const h6Regex = /^###### (.*$)/gim;

export class MarkdownParser {
  public static parse(string: string) {
    const htmlText = string
      .replace(h1Regex, '<h1>$1</h1>')
      .replace(h2Regex, '<h2>$1</h2>')
      .replace(h3Regex, '<h3>$1</h3>')
      .replace(h4Regex, '<h4>$1</h4>')
      .replace(h5Regex, '<h5>$1</h5>')
      .replace(h6Regex, '<h6>$1</h6>')
      .replace(quoteRegex, '<blockquote>$1</blockquote>')
      .replace(boldRegex, '<b>$1</b>')
      .replace(italicRegex, '<i>$1</i>')
      .replace(formattedLinkRegex, "<a href='$2' target='_blank'>$1</a>")
      .replace(linkRegex, "<a href='$1' target='_blank'>$1</a>")
      .replace(paragraphRegex, '<p>$1</p>')
      .replace(lineBreakRegex, '<br/>');
    return htmlText.trim();
  }
}
