// A gentle starter curriculum for adults. Estimated duration includes repetition and practice.
const phrase=(en,ar,hint)=>({en,ar,hint});
const lesson=(id,title,subtitle,icon,phrases,question,choices,answer,scene,reply)=>({id,title,subtitle,icon,phrases,quiz:{question,choices,answer},scene,reply});
export const lessons=[
lesson(1,'أول كلمة: مرحبًا','التحية والوداع','☀',[
phrase('Hello','مرحبًا','هَلو — تقريب للصوت فقط؛ الاستماع أدق.'),phrase('Good morning','صباح الخير','قوليها عند اللقاء في الصباح.'),phrase('Goodbye','إلى اللقاء','قوليها عند الوداع.')],
'كيف تقولين «مرحبًا»؟',['Goodbye','Hello','Good morning'],1,'قابلكِ شخص وقال: Hello. كيف تحيّينه؟','Hello'),
lesson(2,'أعرّف بنفسي','الاسم والتعارف','✦',[
phrase('My name is Sara','اسمي سارة','سارة مثال. يمكنكِ وضع اسمكِ مكانها.'),phrase('What is your name?','ما اسمك؟','سؤال للتعارف.'),phrase('Nice to meet you','سُررت بلقائك','عبارة لطيفة بعد التعارف.')],
'أي عبارة تسألين بها عن الاسم؟',['Nice to meet you','My name is Sara','What is your name?'],2,'تعرّفتِ إلى جارة جديدة. أخبريها باسمكِ. سنتمرّن باسم سارة.','My name is Sara'),
lesson(3,'كيف حالك؟','سؤال وجواب قصيران','♡',[
phrase('How are you?','كيف حالك؟','اسألي، ثم انتظري الإجابة.'),phrase('I am fine','أنا بخير','إجابة بسيطة عن الحال.'),phrase('Thank you','شكرًا لك','للشكر في مواقف كثيرة.')],
'ماذا تعني «I am fine»؟',['أنا بخير','إلى اللقاء','ما اسمك؟'],0,'سمعتِ: How are you? أجيبي بأنكِ بخير.','I am fine'),
lesson(4,'كلمات لطيفة','من فضلك، شكرًا، عفوًا','❀',[
phrase('Please','من فضلك','أضيفيها إلى الطلب ليصبح ألطف.'),phrase('You are welcome','على الرحب والسعة','ردّ على الشكر.'),phrase('Excuse me','عفوًا','للفت الانتباه بأدب أو المرور.')],
'ماذا تقولين لجذب انتباه شخص بأدب؟',['You are welcome','Excuse me','Please'],1,'تريدين سؤال موظفة في المتجر. ابدئي بلفت انتباهها بأدب.','Excuse me'),
lesson(5,'أعد من فضلك','أطلب مساعدة في الفهم','↻',[
phrase('I do not understand','لا أفهم','يمكنكِ قولها بثقة؛ التعلّم يحتاج وقتًا.'),phrase('Please repeat','أعد من فضلك','اطلبي سماع الكلام مرة أخرى.'),phrase('Slowly, please','ببطء، من فضلك','اطلبي كلامًا أبطأ.')],
'كيف تطلبين إعادة الكلام؟',['Please repeat','Thank you','Goodbye'],0,'تحدّث شخص بسرعة. اطلبي منه أن يتكلم ببطء.','Slowly, please'),
lesson(6,'واحد، اثنان، ثلاثة','الأعداد الأولى','123',[
phrase('One','واحد','واحد: 1'),phrase('Two','اثنان','اثنان: 2'),phrase('Three','ثلاثة','ثلاثة: 3')],
'ما العدد «Two»؟',['1','3','2'],2,'تريدين قطعتين. قولي العدد اثنين.','Two'),
lesson(7,'من أربعة إلى ستة','نواصل العد بهدوء','456',[
phrase('Four','أربعة','أربعة: 4'),phrase('Five','خمسة','خمسة: 5'),phrase('Six','ستة','ستة: 6')],
'ما العدد «Five»؟',['5','4','6'],0,'تحتاجين خمس قطع. قولي العدد خمسة.','Five'),
lesson(8,'من سبعة إلى عشرة','نُكمل الأعداد ومراجعة منتصف الطريق','789',[
phrase('Seven','سبعة','سبعة: 7'),phrase('Eight','ثمانية','ثمانية: 8'),phrase('Nine','تسعة','تسعة: 9'),phrase('Ten','عشرة','عشرة: 10')],
'كيف تقولين «عشرة»؟',['Nine','Ten','Seven'],1,'تريدين عشر قطع. قولي العدد عشرة.','Ten'),
lesson(9,'ماء وشاي','طلب بسيط في المقهى','☕',[
phrase('Water, please','ماء، من فضلك','طلب قصير ومهذّب.'),phrase('Tea, please','شاي، من فضلك','يمكنكِ تبديل الكلمة مع إبقاء Please.'),phrase('Coffee, please','قهوة، من فضلك','قهوة: Coffee.')],
'أي عبارة تطلبين بها الماء؟',['Tea, please','Coffee, please','Water, please'],2,'أنتِ في مقهى وتريدين الشاي. ماذا تقولين؟','Tea, please'),
lesson(10,'أنا أحب…','نتحدث عن طعام نحبّه','♧',[
phrase('I like bread','أنا أحب الخبز','I like تعني: أنا أحب.'),phrase('I like rice','أنا أحب الأرز','Rice تعني: أرز.'),phrase('I like apples','أنا أحب التفاح','Apples تعني: تفاح.')],
'ماذا تعني «I like rice»؟',['أنا أحب الخبز','أنا أحب الأرز','أنا أحب التفاح'],1,'أخبري رفيق أنكِ تحبين التفاح.','I like apples'),
lesson(11,'في المتجر','السعر والاختيار','⌑',[
phrase('How much is it?','كم سعره؟','سؤال عن السعر.'),phrase('This one, please','هذا، من فضلك','يمكنكِ الإشارة إلى ما تريدينه.'),phrase('No, thank you','لا، شكرًا','رفض مهذّب.')],
'كيف تسألين عن السعر؟',['How much is it?','No, thank you','This one, please'],0,'وجدتِ شيئًا أعجبكِ. اسألي عن سعره.','How much is it?'),
lesson(12,'عائلتي','كلمات عن أحبّائنا','♧',[
phrase('This is my son','هذا ابني','Son تعني: ابن.'),phrase('This is my daughter','هذه ابنتي','Daughter تعني: ابنة.'),phrase('This is my family','هذه عائلتي','Family تعني: عائلة.')],
'ماذا تعني «daughter»؟',['ابن','ابنة','عائلة'],1,'تُرين صديقة صورة عائلتكِ. قولي: هذه عائلتي.','This is my family'),
lesson(13,'أين…؟','نسأل عن مكان','⌖',[
phrase('Where is the toilet?','أين دورة المياه؟','سؤال مفيد في مكان جديد.'),phrase('Where is the bus stop?','أين موقف الحافلة؟','Bus stop تعني: موقف الحافلة.'),phrase('Where is the shop?','أين المتجر؟','Shop تعني: متجر.')],
'كيف تسألين عن موقف الحافلة؟',['Where is the shop?','Where is the toilet?','Where is the bus stop?'],2,'تحتاجين إلى دورة المياه. اسألي عن مكانها.','Where is the toilet?'),
lesson(14,'أحتاج إلى مساعدة','التعبير عن حاجة بسيطة','♡',[
phrase('I need help','أحتاج إلى مساعدة','اطلبي المساعدة عندما تحتاجينها.'),phrase('I am tired','أنا متعبة','Tired تعني: متعبة.'),phrase('I need a doctor','أحتاج إلى طبيب','عبارة لغوية لطلب طبيب؛ التطبيق ليس خدمة طوارئ.')],
'كيف تقولين «أنا متعبة»؟',['I need help','I am tired','I need a doctor'],1,'تحتاجين مساعدة من موظف. قولي ذلك ببساطة.','I need help'),
lesson(15,'اليوم وغدًا','موعد ومكالمة','◷',[
phrase('Today','اليوم','لشيء يحدث في هذا اليوم.'),phrase('Tomorrow','غدًا','لليوم التالي.'),phrase('See you tomorrow','أراك غدًا','وداع مع موعد قريب.')],
'ماذا تعني «Tomorrow»؟',['اليوم','أمس','غدًا'],2,'ستقابلين صديقتكِ غدًا. كيف تودّعينها؟','See you tomorrow'),
lesson(16,'أستطيع أن أتحدث','مراجعة وموقف صغير','✦',[
phrase('Hello. My name is Sara','مرحبًا. اسمي سارة','اجمعي التحية والتعريف بنفسكِ.'),phrase('Water, please. Thank you','ماء، من فضلك. شكرًا','اجمعي الطلب والشكر.'),phrase('Please repeat. I do not understand','أعد من فضلك. لا أفهم','تذكّري: يمكنكِ طلب الإعادة دائمًا.')],
'أي عبارة تناسب طلب الماء ثم الشكر؟',['Water, please. Thank you','Hello. My name is Sara','Please repeat. I do not understand'],0,'أنتِ في مقهى. اطلبي الماء ثم اشكري الموظف.','Water, please. Thank you')
];
export const extraWords=[phrase('Water','ماء',''),phrase('Tea','شاي',''),phrase('Coffee','قهوة',''),phrase('Bread','خبز',''),phrase('Rice','أرز',''),phrase('Apple','تفاحة',''),phrase('Yes','نعم',''),phrase('No','لا',''),phrase('Mother','أم',''),phrase('Father','أب','')];
