import {forwardRef, useRef, useState, useEffect} from 'react';
import {data as emojiList} from "./data";
import EmojiButton from './EmojiButton';
import EmojiSearch from './EmojiSearch';

export function EmojiPicker (props, inputRef){

    const [isOpen, setIsOpen]= useState(false);
    const [emojis,setEmojis] = useState([...emojiList]);

    const containerRef = useRef(null);

    //se ejecutara cuando iniciamos la aplicacion, si damos click a un elemento padre a nuestra capa de emojis ejecutamos cierto codigo
    //
    useEffect(()=>{
        window.addEventListener('click', e =>{
            if (!containerRef.current.contains(e.target)){
                //si es un elemento padre que cierre el buscador, es decir el componente de emojis
                setIsOpen(false);
                // y resetee los emojis
                setEmojis(emojiList);
            }
        })
    }, []
    );

    

    function handleClickOpen(){
        setIsOpen (!isOpen);
    }

    function handleSearch(e){
        const q = e.target.value.toLowerCase();
        //si esxiste un valor
        
        if (!!q) {
            const search = emojiList.filter((emoji) => {
                return (emoji.name.toLowerCase().includes(q) || emoji.keywords.toLowerCase().includes(q)
                );
            });
            setEmojis(search); 
        } else{
            setEmojis(emojiList);
        }

    }

    /*function EmojiPickerContainer(){
        return(

            <div>
            <EmojiSearch onSearch={handleSearch} />
            <div> 
                {
                    emojiList.map((emoji => <div key={emoji.symbol}> {emoji.symbol}</div>
                        ))
                }
            </div>
        </div>
        )
            
        
    }*/

    function handleOnClickEmoji(emoji){
        const cursorPosition= inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursorPosition);
        const next = text.slice(cursorPosition);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursorPosition + emoji.symbol.length;
        inputRef.current.selectionEnd =  cursorPosition + emoji.sybol.length;
        inputRef.current.focus();

    }
    return(
        <div ref={containerRef}>
            <button onClick={handleClickOpen}> Boton Emoji

            </button>
            {isOpen ? ( 
                <div  >
                <EmojiSearch onSearch={handleSearch} />
                        <div> 
                            
                        {emojis.map((emoji) => (
                         <EmojiButton  key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji} />

                            ))
                        }
                        </div>
                </div>
            ) : ("") }
                
        </div>
    );
                    }
export default forwardRef(EmojiPicker);