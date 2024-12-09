export const commonHeader: string[] = [
  '姓　名（全角スペースを空けてください）',
  'メールアドレス',
];

export const expectedHeaders: { [key: string]: string[] } = {
  建築: [
    '朝礼・昼礼', '安全管理', '写真管理',
    '仮設工事', '杭工事', '山留工事', '鉄筋・コンクリート工事',
    '外部（ALC・PC）・外壁改修工事', '防水工事', '左官（タイル・石・塗装）工事',
    '建具工事', '断熱・内装工事', '解体工事', '内装ダメチェック・内覧立会',
    '積算', '関係書類作成・各種打合実施',
  ],
  土木: ['ID', '開始時刻', '完了時刻', '現場名', '作業内容', '責任者'],
  // 他カテゴリのヘッダーを追加
};

/**
 * ヘッダーを検証する関数
 * @param headers 実際のヘッダー配列
 * @param category 選択されたカテゴリ
 * @param expectedHeaders 各カテゴリの期待されるヘッダー定義
 * @returns 不足しているヘッダーのリスト
 */
export const validateHeaders = (
  headers: string[],
  category: string,
  expectedHeaders: { [key: string]: string[] }
): string[] => {
  // 全ての期待されるヘッダー (commonHeader + category-specific headers)
  const allExpectedHeaders = [...commonHeader, ...(expectedHeaders[category] || [])];

  // 含まれていないヘッダーを検出
  return allExpectedHeaders.filter(
    (header) => !headers.includes(header.trim())
  );
};
