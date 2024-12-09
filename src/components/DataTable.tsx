import React from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

interface DataTableProps {
  columns: any[];
  data: any[];
  onEmployeeNumberChange: (index: number, value: string) => void; // 社員番号の変更イベント
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onEmployeeNumberChange }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // エクスポートボタンのクリックハンドラー
  const handleExport = (rowData: any) => {
    const worksheet = XLSX.utils.json_to_sheet([rowData]); // 選択された行のデータをエクスポート
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `exported_row_${rowData.ID || 'unknown'}.xlsx`);
    alert('行データをエクスポートしました！');
  };

  // 数字のみを抽出し、全角数字を半角数字に変換する関数
  const extractNumericValue = (value: any): string => {
    if (!value) return ''; // 値がない場合は空文字
    const stringValue = value.toString();
    const match = stringValue.match(/[０-９0-9]+/g); // 全角・半角の数字部分を抽出
    if (match) {
      // 抽出した数字部分を全角→半角に変換して返す
      return match
        .join('')
        .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
    }
    return ''; // 数字が見つからない場合は空文字
  };

  // 変換を適用しない共通列
  const commonColumns = ['開始時刻', '完了時刻', 'メール', '姓　名（全角スペースを空けてください）', 'メールアドレス'];

  return (
    <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
      <thead>
        <tr>
          {/* 社員番号列のヘッダー */}
          <th
            style={{
              border: '1px solid black',
              padding: '8px',
              width: '150px', // 幅を指定
              minWidth: '150px', // 最小幅
            }}
          >
            社員番号
          </th>
          {/* 出力列のヘッダー */}
          <th style={{ border: '1px solid black', padding: '8px' }}>出力</th>
          {headerGroups.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIndex}>
              {/* 社員番号のセル */}
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  width: '150px', // 幅を指定
                  minWidth: '150px', // 最小幅
                }}
              >
                <input
                  type="text"
                  value={data[rowIndex].社員番号 || ''}
                  onChange={(e) => onEmployeeNumberChange(rowIndex, e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              {/* 出力列のセル */}
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <button
                  onClick={() => handleExport(data[rowIndex])}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  エクスポート
                </button>
              </td>
              {/* その他のセル */}
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                  {/* 共通列はそのまま表示、それ以外は数字のみ抽出して表示 */}
                  {commonColumns.includes(cell.column.id)
                    ? cell.value // 共通列はそのまま表示
                    : extractNumericValue(cell.value)} {/* 数字抽出 */}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
