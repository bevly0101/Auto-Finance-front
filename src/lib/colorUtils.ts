// src/lib/colorUtils.ts

/**
 * Mapa de cores pré-definidas para categorias padrão.
 * Usamos HSL para facilitar a manipulação e garantir cores vibrantes.
 */
const PREDEFINED_COLORS: Record<string, string> = {
  // Tons de Azul e Roxo (Despesas mais "sérias" ou fixas)
  'Moradia': 'hsl(210, 55%, 58%)',
  'Contas': 'hsl(220, 45%, 60%)',
  'Transporte': 'hsl(240, 40%, 65%)',
  'Impostos': 'hsl(260, 35%, 62%)',
  
  // Tons de Verde (Receitas ou investimentos)
  'Salário': 'hsl(140, 50%, 55%)',
  'Investimentos': 'hsl(160, 60%, 45%)',
  'Renda Extra': 'hsl(150, 55%, 50%)',

  // Tons de Amarelo e Laranja (Despesas variáveis)
  'Alimentação': 'hsl(45, 70%, 60%)',
  'Supermercado': 'hsl(35, 75%, 58%)',
  'Lazer': 'hsl(55, 65%, 55%)',
  
  // Tons de Vermelho e Rosa (Despesas "perigosas" ou impulsivas)
  'Compras': 'hsl(0, 65%, 60%)',
  'Saúde': 'hsl(340, 70%, 62%)',
  'Educação': 'hsl(350, 68%, 65%)',

  // Outros
  'Outros': 'hsl(0, 0%, 70%)',
};

/**
 * Gera um hash numérico a partir de uma string.
 * Usado para criar uma cor consistente para uma categoria.
 * @param str A string de entrada (nome da categoria)
 * @returns Um número hash
 */
const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

/**
 * Gera uma cor HSL vibrante e única com base no hash de uma string.
 * @param str O nome da categoria
 * @returns Uma string de cor no formato HSL (ex: 'hsl(123, 60%, 70%)')
 */
const generateColorFromString = (str: string): string => {
  const hash = stringToHash(str);
  const hue = Math.abs(hash % 360); // Garante um matiz entre 0 e 360
  const saturation = 50 + Math.abs(hash % 25); // Saturação entre 50% e 75%
  const lightness = 60 + Math.abs(hash % 15); // Luminosidade entre 60% e 75%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Obtém uma cor para uma categoria.
 * Se a categoria for pré-definida, retorna a cor correspondente.
 * Caso contrário, gera uma nova cor consistente com base no nome da categoria.
 * @param categoryName O nome da categoria
 * @returns A cor da categoria em formato HSL.
 */
export const getCategoryColor = (categoryName: string): string => {
  const predefinedColor = PREDEFINED_COLORS[categoryName];
  if (predefinedColor) {
    return predefinedColor;
  }

  // Garante que a cor gerada não colida com as pré-definidas
  let newColor = generateColorFromString(categoryName);
  while (Object.values(PREDEFINED_COLORS).includes(newColor)) {
    // Adiciona um "salt" para gerar uma nova cor em caso de colisão
    newColor = generateColorFromString(categoryName + '#');
  }

  return newColor;
};