import React, { useState } from 'react';
import FileUploader from '../components/FileUploader.tsx';
import DataTable from '../components/DataTable.tsx';
import CategorySelector from '../components/CategorySelector.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import { validateHeaders, expectedHeaders } from '../utils/validation.ts';

const TopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('建築');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const commonColumns = ['姓　名（全角スペースを空けてください）', 'メールアドレス'];

  const handleFileUpload = (uploadedData: any[]) => {
    if (uploadedData.length === 0) {
      setError('アップロードされたファイルにデータがありません。');
      setData([]);
      return;
    }

    const headers = Object.keys(uploadedData[0]);
    const missingHeaders = validateHeaders(headers, selectedCategory, expectedHeaders);

    if (missingHeaders.length > 0) {
      setError(`以下のヘッダーが不足しています: ${missingHeaders.join(', ')}`);
      setData([]);
      return;
    }

    setError(null);
    setData(uploadedData);
  };

  const columns = React.useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [data]
  );

  return (
    <div>
      <h1>TOPページ</h1>

      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div style={{ marginTop: '20px' }}>
        <h2>ファイルをインポートしてください</h2>
        <FileUploader onFileUpload={handleFileUpload} />
        {error && <ErrorMessage message={error} />}
      </div>

      <div style={{ marginTop: '20px' }}>
        {data.length > 0 ? (
          <>
            <h2>インポートしたデータ</h2>
            <DataTable
              columns={columns}
              data={data}
              onEmployeeNumberChange={(index, value) => {
                const updatedData = [...data];
                updatedData[index].社員番号 = value;
                setData(updatedData);
              }}
            />
          </>
        ) : (
          <p>データがありません。ファイルをインポートしてください。</p>
        )}
      </div>
    </div>
  );
};

export default TopPage;
