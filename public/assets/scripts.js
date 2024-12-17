$(function(){
    var socket = io();
    console.log({socket});
    


    /*///////****************\\\\\\\*\
    /*///////****************\\\\\\\*\
    /*|||||||***SPREADSHIT***|||||||*\
    /*\\\\\\\****************///////*\
    /*\\\\\\\****************///////*\
    let data = [
        ['Mazda', 2001, 2000],
        ['Pegeout', 2010, 5000],    
        ['Honda Fit', 2009, 3000],    
        ['Honda CRV', 2010, 6000],
    ];
    
    var worksheet = jspreadsheet(document.getElementById('spreadsheet'), {
        minDimensions:[10,5],
        onafterchanges: async (a) => {

            
            socket.emit('updateSheet', worksheet.getData());
        }
    });

    socket.on('onInitSpreadSheet', (dataWorksheet) => {

        if(dataWorksheet){

            worksheet.setData(dataWorksheet);
        }
    });

    socket.on('receivedUpdateSheet', (dataWorksheet) => {

        worksheet.setData(dataWorksheet);
    });


    /*///////****************\\\\\\\*\
    /*///////****************\\\\\\\*\
    /*|||||||******CHAT******|||||||*\
    /*\\\\\\\****************///////*\
    /*\\\\\\\****************///////*\
    function renderMessage(msgObj) {

        let $message = $('.messages');

        $message.append(`
            <div>
                <b>${msgObj.author}</b>: ${msgObj.message}
            </div>
        `);
        
        $message.animate({scrollTop: $message.get(0).scrollHeight}, {duration: 1000, queue: false});
    }

    socket.on('onInitChat', (listMessages) => {
        
        listMessages.forEach(msgObj => {
            renderMessage(msgObj);
        });
    });

    socket.on('receivedMessage', (msgObj) => {
        console.log({msgObj});
        
        renderMessage(msgObj);
    });

    $('#chat').submit(function (event) {
        event.preventDefault();

        let author = $('input[name="username"').val();
        let message = $('input[name="message"').val();

        if(author.length && message.length){
            
            let msgObj = {author, message}
            
            renderMessage(msgObj);
            socket.emit('sendMessage', msgObj);
        }
    })

    
});
    