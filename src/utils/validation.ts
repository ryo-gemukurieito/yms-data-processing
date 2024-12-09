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
  土木: ['朝礼・昼礼','安全管理','写真管理','レベル・トランシット_光波・墨出し',
'造成工事','道路工事（一般・高速）','塗装工事','上水・下水工事',
'港湾工事','鉄道工事','河川工事','橋梁下部・橋梁上部工事','トンネル工事',
'ダム工事','共同溝工事','法面工事','仮設工事','土工事','山留工事',
'鉄筋工事','コンクリート工事',],
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
