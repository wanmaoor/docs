import { Paragraph, TextRun } from "docx";

const paragraphParser = (root) => {
  if (root.nodeType === 1) {
    return root.childNodes.map((node) => {
      return new TextRun(textTransformer(node._rawText));
    });
  }

  if (root.nodeType === 3) {
    return new TextRun(textTransformer(root._rawText));
  }
};

const textTransformer = (text) => {
  return text.replace(/&nbsp;/, " ");
};

const styleAndClassParser = (attrs) => {
  const segments = attrs.split(" ");
  const classList = [];
  const styleList = [];
  //
  segments.forEach((segment) => {
    const [attr, attrValues] = segment.split("=");
    if (attr === "class") {
      classList.concat(attrValues);
    } else if (attr === "style") {
      styleList.concat(
        attrValues.split(";").map((item) => {
          const [key, value] = item.split(": ");
          return { [key]: value };
        })
      );
    }
  });

  //
};

function parser(root) {
  const isRoot = root.parentNode === null;

  if (isRoot) {
    return root.childNodes.map((node) => {
      console.log("node : ", node);
      return new Paragraph({
        children: node.childNodes.map((i) => parser(i)).flat(10)
      });
    });
  } else {
    return paragraphParser(root);
  }
}

export default parser;
