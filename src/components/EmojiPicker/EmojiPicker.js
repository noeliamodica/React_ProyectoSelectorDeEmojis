import {forwardRef, useState} from 'react';
import {data as emojiList} from "./data";
import EmojiButton from './EmojiButton';
import EmojiSearch from './EmojiSearch';

export function EmojiPicker (props, inputRef){

    const [isOpen, setIsOpen]= useState(false);
    const [emojis,setEmojis] = useState(emojiList);
    

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
        <div>
            <button onClick={handleClickOpen}> Boton Emoji

            </button>
            {isOpen ? ( 
                <div>
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