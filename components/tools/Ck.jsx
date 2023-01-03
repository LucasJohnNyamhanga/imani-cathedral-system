import React, { Component, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-extended";
import Styles from "../../styles/ckEditor.module.scss";

// type dataContent = {
//   content: (data: string) => void;
//   dataCk: string;
//   onReadyToStart: () => void;
// };

const Ck = ({ content, dataCk, onReadyToStart }) => {
  const [data, setData] = useState(dataCk);

  useEffect(() => {
    setData(dataCk);
  }, []);

  return (
    <div className={Styles.container}>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={onReadyToStart}
        onChange={(event, editor) => {
          const data = editor.getData();
          content(data);
        }}
        onBlur={(event, editor) => {
          //console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //console.log("Focus.", editor);
        }}
        config={{
          toolbar: {
            items: [
              "heading",
              "|",
              "fontfamily",
              "fontsize",
              "|",
              "alignment",
              "|",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "strikethrough",
              "underline",
              "subscript",
              "superscript",
              "|",
              "link",
              "|",
              "outdent",
              "indent",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "|",
              "code",
              "codeBlock",
              "blockQuote",
              "|",
              "link",
              "imageUpload",
              "|",
              "insertTable",
              "specialCharacters",
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "mediaEmbed",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },

          simpleUpload: {
            // The URL that the images are uploaded to.
            // uploadUrl: 'http://127.0.0.1:8000/api/uploadCk',
            uploadUrl: "https://www.database.co.tz/api/uploadCk",
            // uploadUrl: 'http://localhost:3000/api/uploadCkReDirect',
            // withCredentials: true,
            // headers: {
            // 	'X-CSRF-TOKEN': 'CSRF-Token',
            // 	Authorization: 'Bearer <JSON Web Token>',
            // },
          },
        }}
      />
    </div>
  );
};

export default Ck;
function handleEditor() {
  throw new Error("Function not implemented.");
}
