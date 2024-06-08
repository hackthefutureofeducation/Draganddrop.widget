import random
def Generate(wordList):
    content_aside = ""
    content_main = ""
    nums = []
    for item in wordList:
        ran = random.random()
        while ran in nums:
            ran = random.random()
        

        content_aside += f"""
            <div class="item" draggable="true" data-answer="{ran}">
                {item['first']}
            </div>
        """
        content_main += f"""
            <div class="item-list">
                    <p>{item['second']}</p>
                    <div class="dropzone" ondragover="allowDrop(event)">
                        <div class="box" data-answer="{ran}"></div>
                    </div>
                </div>
        """
    
    with open('index.html', 'r') as file:
        file_content = file.read().replace('$main_section', content_main).replace('$aside_section', content_aside)
        file.close()
        with open('index.html', 'w') as main:
            main.write(file_content)
    
    print('Done.')

Generate([{
    'first': 'he',
    'second': 'y'
}])
