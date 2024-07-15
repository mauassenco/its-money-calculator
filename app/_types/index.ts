export type AcfFields = {
  superior_title_text?: string;
  inferior_title_text?: string;
  title?: string;
  description_text?: string;
  cta_label?: string;
  accordion_title?: string;
  accordion_subtitle?: string;
  accordion?: AcfFieldsAccordionItem[]; // Use subtype for Accordion
  etapas?: AcfFieldsEtapa[]; // Use subtype for Etapas
  tabs: AcfFieldsTab[]; // Use subtype for Tabs
};

// Subtype for Accordion items
type AcfFieldsAccordionItem = {
  accordion_item_question?: string;
  accordion_item_answer?: string;
};

// Subtype for Etapas items
type AcfFieldsEtapa = {
  titulo_da_etapa: string;
  texto_da_etapa: string;
  questoes_da_etapa: AcfFieldsEtapaQuestao[]; // Use subtype for Questoes da Etapa
};

// Subtype for Questoes da Etapa items (question)
type AcfFieldsEtapaQuestao = {
  questao: any;
  texto_da_questao?: string;
  tipo_da_questao?: string;
  texto_do_placeholder?: string;
  opcoes_de_resposta?: AcfFieldsEtapaQuestaoOpcoes[]; // U
}

// Subtype for Opcoes de Resposta items (multiple choice options)
type AcfFieldsEtapaQuestaoOpcoes = {
  opcao_de_resposta_multipla?: string;
};

// Subtype for Tabs items
type AcfFieldsTab = {
  dados_da_aba?: {
    nome_da_aba?: string;
    texto_principal?: string;
    subcards: {
      icone_card_a: string;
      texto_card_a: string;
      icone_card_b: string;
      texto_card_b: string;
    }; 
    observacao?: string;

  };
};

// Subtype for Subcards items
// type AcfFieldsTabSubcard = {
//   icone_card_a: string;
//   texto_card_a: string;
//   icone_card_b: string;
//   texto_card_b: string;
// };
