import React from 'react';

interface FileUploaderProps {
  onFileUpload: (data: any[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      import('xlsx').then((xlsx) => {
        // エンコードのサポートを有効化
        const codepage = require('xlsx/dist/cpexcel'); // 必要ならインストール
        xlsx.utils.cptable = codepage;

        const workbook = xlsx.read(data, {
          type: 'binary',
          raw: false,
          codepage: 932, // Shift-JIS の場合
        });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        onFileUpload(jsonData);
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
