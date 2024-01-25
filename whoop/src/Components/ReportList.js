import '../Styles.css'

export default function ReportList({ workouts }){  
    const go2Report = (id) => {
        window.location.href = '/report/' + id;
    }

    return(
        <div style={{backgroundColor:'transparent'}}>
            <h1 className='headline' style={{color:'#00F19F', textAlign:'center', position:'relative', bottom:20}}>Report List</h1>
            <div className="scroll">
                {
                    workouts.map((w, i) =>{
                        return(
                            <div onClick={() => go2Report(w.id)} key={i} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:60, borderBottom:'1px solid #00F19F'}}>
                                <a style={{textDecoration:'none'}} className='body-text'>
                                    <h3 style={{color:'#00F19F'}} className='body-text'>Report {i+1}</h3>
                                </a>
                            </div>
                        )
                    })
        
                }
            </div>
        </div>
    )
}