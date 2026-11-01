// Scaffolded communicative practice. These authored tasks do not diagnose a learner's accent.
const turn = (cue, partner, expected, meaning, accepted = []) => ({cue, partner, expected, meaning, accepted});
const plan = (goal, setting, picture, story, turns, transfer) => ({goal, setting, picture, story, turns, transfer});
export const plans = {
  1: plan('أستطيع أن أحيّي شخصًا وأودّعه.', 'أمام البيت', '🏡', 'خرجتِ من البيت وقابلتِ جارتكِ. نبدأ بتحية، ثم نودّعها عندما نذهب.', [turn('جارتكِ تحيّيكِ. ردّي عليها.', 'Hello!', 'Hello', 'مرحبًا', ['Hi','Hello there']), turn('حان وقت الذهاب. ودّعي جارتكِ.', 'Goodbye!', 'Goodbye', 'إلى اللقاء', ['Bye','Bye bye','See you'])], 'اليوم، حيّي أحد أفراد العائلة بـ Hello، وودّعيه بـ Goodbye.'),
  2: plan('أستطيع أن أقول اسمي وأسأل عن اسم شخص.', 'لقاء جديد', '🤝', 'تلتقين بامرأة للمرة الأولى. يمكنكِ استخدام اسمكِ الحقيقي؛ سارة مجرد مثال.', [turn('سألتكِ عن اسمكِ. عرّفي بنفسكِ.', 'What is your name?', 'My name is Sara', 'اسمي سارة'), turn('عرّفتكِ باسمها. قولي إنكِ سُررتِ بلقائها.', 'My name is Mary.', 'Nice to meet you', 'سُررت بلقائك', ['Nice to meet you too'])], 'عرّفي بنفسكِ لشخص من العائلة، ثم اسأليه عن اسمه بالإنجليزية.'),
  3: plan('أستطيع السؤال عن الحال والردّ بأدب.', 'زيارة صديقة', '🌷', 'صديقتكِ تسأل عن حالكِ. استمعي إلى السؤال، ثم اختاري جوابًا مناسبًا.', [turn('تسأل عن حالكِ. أخبريها أنكِ بخير.', 'How are you?', 'I am fine', 'أنا بخير', ['I am fine thank you','I am good','Fine','Fine thanks']), turn('والآن اسأليها عن حالها.', 'I am fine, thank you.', 'How are you?', 'كيف حالك؟', ['And you','How about you'])], 'جرّبي محادثة من سؤال وجواب مع أحد أفراد العائلة.'),
  4: plan('أستطيع جذب الانتباه والشكر بأدب.', 'في المتجر', '🛍️', 'تريدين سؤال الموظفة. قبل السؤال نلفت انتباهها بلطف. وعندما يشكرنا شخص، نرد عليه.', [turn('ابدئي بلفت انتباه الموظفة بأدب.', '', 'Excuse me', 'عفوًا'), turn('شكرتكِ الموظفة. ما الرد المناسب؟', 'Thank you.', 'You are welcome', 'على الرحب والسعة', ['You are welcome','You are very welcome'])], 'استخدمي Please عند طلب شيء، وYou are welcome عند الرد على الشكر.'),
  5: plan('أستطيع طلب الإعادة عندما لا أفهم.', 'حديث سريع', '👂', 'لا تحتاجين إلى فهم كل شيء. يمكنكِ أن تطلبي الإعادة أو كلامًا أبطأ، وهذا جزء طبيعي من التعلّم.', [turn('لم تفهمي الكلام. اطلبي إعادته.', 'Good morning. How are you?', 'Please repeat', 'أعد من فضلك', ['Repeat please','Can you repeat please','Could you repeat please','Say it again please']), turn('ما زال الكلام سريعًا. اطلبي التمهّل.', '', 'Slowly, please', 'ببطء، من فضلك', ['Please speak slowly','Speak slowly please'])], 'جرّبي طلب الإعادة أثناء الدرس بدل محاولة التخمين.'),
  6: plan('أستطيع طلب قطعة أو قطعتين أو ثلاث.', 'على المائدة', '🍎', 'لدينا تفاح على الطاولة. نستخدم العدد لتوضيح الكمية التي نريدها.', [turn('تريدين تفاحتين. قولي العدد.', '', 'Two', 'اثنان', ['Two please']), turn('أصبحتِ تريدين ثلاث تفاحات. قولي العدد.', '', 'Three', 'ثلاثة', ['Three please'])], 'عدّي ثلاثة أشياء في البيت بصوتكِ: One, two, three.'),
  7: plan('أستطيع استخدام الأعداد من أربعة إلى ستة.', 'ترتيب الأكواب', '☕', 'تجهزين المائدة. لكل ضيف كوب؛ نعد الأكواب بهدوء.', [turn('لدينا أربعة ضيوف. كم كوبًا نحتاج؟', '', 'Four', 'أربعة'), turn('وصل ضيفان آخران. أصبح العدد ستة. قولي ستة.', '', 'Six', 'ستة')], 'عدّي ستة أكواب، بدءًا من One، ثم عودي إلى آخر ثلاثة أعداد.'),
  8: plan('أستطيع العدّ حتى عشرة.', 'تجهيز المائدة', '🔢', 'نُكمل الأعداد ونربط كل كلمة بكمية. يمكنكِ عدّ أشياء حقيقية أمامكِ.', [turn('نحتاج ثمانية أطباق. قولي العدد.', '', 'Eight', 'ثمانية'), turn('أضيفي طبقين. أصبح العدد عشرة. قولي عشرة.', '', 'Ten', 'عشرة')], 'عدّي عشرة أشياء في البيت، ثم اختاري كمية عشوائية وسمّيها.'),
  9: plan('أستطيع طلب مشروب بأدب.', 'في المقهى', '☕', 'وصلتِ إلى المقهى. تختارين المشروب، ثم تضيفين Please ليصبح الطلب ألطف.', [turn('النادل يرحّب بكِ. اطلبي الشاي.', 'Hello!', 'Tea, please', 'شاي، من فضلك', ['Can I have tea please','I would like tea please','A tea please','Please tea']), turn('والآن اطلبي الماء.', '', 'Water, please', 'ماء، من فضلك', ['Can I have water please','I would like water please','Some water please','Please water'])], 'مثّلي دور الزبونة مع أحد أفراد العائلة، وغيّري المشروب كل مرة.'),
  10: plan('أستطيع التعبير عن طعام أحبه.', 'حديث عن الطعام', '🍞', 'نتحدث عن أطعمة نحبها. نُبقي بداية العبارة I like، ونغيّر اسم الطعام.', [turn('أخبري صديقتكِ أنكِ تحبين الأرز.', '', 'I like rice', 'أنا أحب الأرز', ['I love rice']), turn('والآن أخبريها أنكِ تحبين التفاح.', '', 'I like apples', 'أنا أحب التفاح', ['I love apples'])], 'اختاري طعامًا من الدرس تحبينه فعلًا، وقولي جملة عنه.'),
  11: plan('أستطيع السؤال عن السعر واختيار شيء.', 'شراء غرض', '🛒', 'رأيتِ شيئًا أعجبكِ. تسألين أولًا عن سعره، ثم تشيرين إلى اختياركِ.', [turn('اسألي عن سعر الغرض.', '', 'How much is it?', 'كم سعره؟', ['How much','How much is this','How much does it cost']), turn('قررتِ شراءه. أشيري إليه واطلبيه.', '', 'This one, please', 'هذا، من فضلك', ['This please','I would like this one please'])], 'اختاري غرضًا في البيت ومثّلي سؤال السعر ثم الشراء.'),
  12: plan('أستطيع التعريف بأفراد عائلتي.', 'صورة عائلية', '🖼️', 'تُرين صديقتكِ صورة عائلية. نستخدم This is my قبل الشخص أو العائلة.', [turn('أشيري إلى صورة العائلة وقدّميها.', '', 'This is my family', 'هذه عائلتي'), turn('وفي مثالنا توجد ابنة في الصورة. عرّفي بها.', '', 'This is my daughter', 'هذه ابنتي')], 'استخدمي صورة مناسبة لكِ أو صورة خيالية للتدرّب؛ لا يلزم رفعها إلى التطبيق.'),
  13: plan('أستطيع السؤال عن مكان أحتاج إليه.', 'في مكان جديد', '🚌', 'عندما تبحثين عن مكان، ابدئي بـ Where is، ثم اسم المكان.', [turn('ابحثي عن موقف الحافلة بالسؤال.', '', 'Where is the bus stop?', 'أين موقف الحافلة؟', ['Where is a bus stop']), turn('والآن اسألي عن دورة المياه.', '', 'Where is the toilet?', 'أين دورة المياه؟', ['Where is the bathroom','Where is the restroom'])], 'مثّلي موقف السؤال عن مكان، ثم قولي Thank you بعد المساعدة.'),
  14: plan('أستطيع التعبير عن حاجة إلى مساعدة.', 'عند الاستقبال', '🙋', 'نعرف اليوم عبارات قصيرة للتعبير عن حاجة. الدرس لتعلّم اللغة، وليس لتقديم إرشادات طبية.', [turn('تحتاجين مساعدة من موظف. اطلبيها.', '', 'I need help', 'أحتاج إلى مساعدة', ['Can you help me','Help please','Please help me']), turn('تريدين وصف التعب. قولي إنكِ متعبة.', '', 'I am tired', 'أنا متعبة', ['I feel tired'])], 'تدرّبي على طلب المساعدة بجملة قصيرة وواضحة.'),
  15: plan('أستطيع التمييز بين اليوم وغدًا.', 'موعد مع صديقة', '📅', 'نختار كلمة تدل على الوقت، ثم نستخدمها في وداع قصير.', [turn('في هذا المثال، اللقاء غدًا. قولي غدًا.', '', 'Tomorrow', 'غدًا'), turn('ودّعي صديقتكِ واذكري لقاء الغد.', '', 'See you tomorrow', 'أراك غدًا', ['I will see you tomorrow'])], 'اذكري موعدًا خياليًا اليوم أو غدًا، ثم قولي الكلمة المناسبة.'),
  16: plan('أستطيع إكمال موقف قصير من البداية إلى النهاية.', 'زيارة مقهى', '🌟', 'نربط ما تعلمناه: تحية، ثم طلب مهذّب وشكر. يمكنكِ الرجوع إلى أي كلمة تحتاجينها.', [turn('حيّي شخصًا جديدًا وعرّفي بنفسكِ.', 'Hello!', 'Hello. My name is Sara', 'مرحبًا. اسمي سارة'), turn('اطلبي الماء واشكري الموظف.', '', 'Water, please. Thank you', 'ماء، من فضلك. شكرًا', ['Can I have water please thank you','I would like water please thank you'])], 'مثّلي الموقف كاملًا مع أحد أفراد العائلة. استعيني بالأمثلة عند الحاجة، ثم جرّبي مرة أخرى دون قراءتها.')
};

export const wordCoach = {
  please: 'لصوت p: أغلقي الشفتين ثم افتحيهما مع دفعة هواء خفيفة. جرّبي الصوت، ثم الكلمة كاملة.',
  thank: 'لبداية thank: ضعي طرف اللسان برفق قرب حافة الأسنان الأمامية، وأخرجي الهواء. اسمعي النموذج ثم جرّبي.',
  three: 'لبداية three: طرف اللسان قريب من حافة الأسنان الأمامية مع خروج الهواء. استمعي ثم جرّبي ببطء.',
  morning: 'اسمعي جزأي الكلمة: MORN-ing. الجزء الأول أوضح وأقوى قليلًا.',
  water: 'اسمعي الكلمة كاملة. يختلف صوتها قليلًا بين اللهجات الإنجليزية، وهذا طبيعي.',
  coffee: 'اسمعي جزأي الكلمة: COF-fee. الجزء الأول أوضح قليلًا.',
  family: 'اسمعي الكلمة كوحدة واحدة. لا تحتاجين إلى نطق كل حرف مكتوب منفصلًا.',
  daughter: 'اسمعي daughter كوحدة واحدة؛ الحرفان gh لا يُنطقان هنا.',
  welcome: 'اسمعي جزأي الكلمة: WEL-come. الجزء الأول أوضح قليلًا.'
};

export function teachingPlan(lesson) { return plans[lesson.id]; }
export function lessonSequence(lesson, allLessons) {
  const result = [{type:'intro'}];
  if (lesson.id > 1) result.push({type:'warmup', phrase:allLessons[lesson.id-2].phrases[0]});
  lesson.phrases.forEach((phrase,index) => result.push({type:'discover',phrase,index},{type:'understand',phrase,index}));
  const phrase = lesson.phrases.find(p=>p.en.split(/\s+/).length>1) || lesson.phrases[0];
  if (phrase.en.split(/\s+/).length>1) result.push({type:'build',phrase});
  result.push(...plans[lesson.id].turns.map((turn,index)=>({type:'roleplay',turn,index})));
  result.push({type:'recall'}, {type:'complete'});
  return result;
}
export function meaningChoices(lesson,index) {
  const correct=lesson.phrases[index];
  const options=lesson.phrases.filter((p,i)=>i!==index).slice(0,2).map(p=>({label:p.ar,correct:false}));
  options.splice((lesson.id+index)%3,0,{label:correct.ar,correct:true});
  return options;
}
export function buildTokens(phrase) {return phrase.en.split(/\s+/).map((text,id)=>({id,text}));}
export function currentTarget(step,lesson) {
  return step.type==='roleplay'?{en:step.turn.expected,ar:step.turn.meaning,accepted:step.turn.accepted}:step.phrase||{en:lesson.reply,ar:lesson.scene};
}
