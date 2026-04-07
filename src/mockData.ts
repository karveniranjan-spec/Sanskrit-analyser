import type { VedicData } from './types';

export const generateMockVedicData = (_input: string): VedicData => {
    return {
        verseId: "Rigveda 1.1.1 (Mocked Result)",
        mantraDevanagari: "अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् । होता॑रं रत्न॒धात॑मम् ॥",
        mantraTransliteration: "a̱gnimī॑ḷe pu̱rohi॑taṃ ya̱jñasya॑ de̱vamṛ̱tvija॑m | hotā॑raṃ ratna̱dhāta॑mam ||",
        literalTranslation: "I praise Agni, the chosen Priest, God, minister of sacrifice, the hotar, lavishest of wealth.",
        philosophicalTranslation: "I invoke the Divine Fire (Agni), the inner illuminating will placed at the forefront of the sequence of the inner journey, the divine minister who transforms our actions into offerings, and the supreme bestower of spiritual riches.",
        padapathaDevanagari: "अ॒ग्निम् । ई॒ळे॒ । पु॒रःऽहि॑तम् । य॒ज्ञस्य॑ । दे॒वम् । ऋ॒त्विज॑म् । होता॑रम् । र॒त्न॒ऽधात॑मम् ॥",
        padapathaTransliteration: "a̱gnim | ī̱ḷe̱ | pu̱raḥ-hi॑tam | ya̱jñasya॑ | de̱vam | ṛ̱tvija॑m | hotā॑ram | ra̱tna̱-dhāta॑mam ||",
        wordAnalysis: [
            { word: "अग्निम्", transliteration: "agnim", meaning: "Agni, the God of Fire" },
            { word: "ईळे", transliteration: "īḷe", meaning: "I praise / I invoke" },
            { word: "पुरोहितम्", transliteration: "purohitam", meaning: "The high priest / placed in front" },
            { word: "यज्ञस्य", transliteration: "yajñasya", meaning: "Of the sacrifice" },
            { word: "देवम्", transliteration: "devam", meaning: "The divine / shining one" },
            { word: "ऋत्विजम्", transliteration: "ṛtvijam", meaning: "The ministering priest" },
            { word: "होतारम्", transliteration: "hotāram", meaning: "The invoker / offerer" },
            { word: "रत्नधातमम्", transliteration: "ratnadhātamam", meaning: "The greatest bestower of wealth/jewels" },
        ],
        imagePrompt: "A mystical Ancient Indian fire ritual (yajna) with a brilliant glowing fire, golden hues, a majestic priest invoking the divine energy under the starlit cosmic sky, cinematic lighting, conceptual digital art.",
        notebookLmInput: "This passage is Rigveda 1.1.1, the very first verse of the Rigveda. It is a hymn dedicated to Agni, the fire god, who is addressed as the divine priest of the sacrifice, the invoker, and the bestower of the greatest wealth. Analyze its philosophical significance in the context of Vedic cosmology."
    };
};
