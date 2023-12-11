import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {GetCurrentTrendingAlbum} from '../api/apis'
import whiteHeart from '../img/whiteHeart.png';
import redHeart from '../img/redHeart.png';
import { SetLikeAlbum } from '../api/album';
import { ClearLikedAlbums } from '../api/album';


function CurrentTrendingAlbum(props){

    const [ CurrentTrendingAlbum, setCurrentTrendingAlbum ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    console.log(props);
  
    useEffect(() => {
        ClearLikedAlbums();
        GetCurrentTrendingAlbum( props.country, (data) => {
            setCurrentTrendingAlbum(data);
            setLoading( false ); 
        }, (err) => {
            setError( err );
            setLoading( false );
        } );
    }, [props.country] ); 

    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }

    return (
        <>
            <div className='trending-album'>
            {
            loading 
            ?
            <p>Loading trending albums...</p>
            :
            CurrentTrendingAlbum.map( m => (
                // <div className='trending-album-item' key={m.idAlbum}>             
                //     <img 
                //         className='poster'
                //         src={m.strAlbumThumb ? m.strAlbumThumb : 'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                //         alt={m.strAlbum} 
                //         onClick={ () => navigateTo(`/album/${m.idAlbum}`)}
                //     /> 
                    
                //     <div className="album-lable" >
                //         <div onClick={ () => navigateTo(`/album/${m.idAlbum}`)}>{ m.strAlbum }( { m.strCountry.toUpperCase() } )</div>
                //         <div>{ m.strArtist }</div>
                //         <div className='likeDiv'>
                //             <img key={m.idAlbum} className="likeBtn" onClick={() => {setLike(!like)}}src={like ? redHeart : whiteHeart} alt='red heart'/>
                //         </div>
                //     </div>
                    
                // </div>
                <AlbumFace album={m} />
                
            )
            )
            }
            </div>
        </>
    )


};

export function AlbumFace({album}) {

    const navigateTo = useNavigate();
    const [ like, setLike] = useState( false );
    const likedAlbums = JSON.parse(localStorage.getItem('liked-albums')) || [];
    console.log(likedAlbums);
    


    const onLikeClick = (albumId)=>{
        SetLikeAlbum(albumId, !like);
        setLike(!like);
    };

    return (        
        <div className='trending-album-item' key={album.idAlbum}>             
            <img 
                className='poster'
                src={album.strAlbumThumb ? album.strAlbumThumb : 'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                alt={album.strAlbum} 
                onClick={ () => navigateTo(`/album/${album.idAlbum}`)}
            /> 
            
            <div className="album-lable" >
                <div onClick={ () => navigateTo(`/album/${album.idAlbum}`)}>{ album.strAlbum }( { album.strCountry ? album.strCountry.toUpperCase() : album.intYearReleased } )</div>
                <div className='artist-like'>
                    { album.strArtist }
                    <span>
                        <img key={album.idAlbum} className="likeBtn" onClick={()=>{onLikeClick(album.idAlbum)}} src={like ? redHeart : whiteHeart} alt='red heart'/>
                    </span>
                </div>
            </div>  
         
        </div>
    );

}

export default CurrentTrendingAlbum;