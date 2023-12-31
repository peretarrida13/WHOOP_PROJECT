import './scroll.css'

export default function ReportList(){  

    const go2Report = (id) => {
        window.location.href = '/report/' + id;
    }

    return(
        <div>
            <h1 style={{color:'#00F19F', textAlign:'center', position:'relative', bottom:20}}>Report List</h1>
            <div className="scroll">
                {
                    [...Array(10)].map((e, i) =>{
                        return(
                            <div onClick={() => go2Report(i)} key={i} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:60, borderBottom:'1px solid #00F19F'}}>
                                <a style={{textDecoration:'none'}}>
                                    <h3 style={{fontWeight:'bold', color:'#00F19F'}}>Report {i+1}</h3>
                                </a>
                            </div>
                        )
                    })
        
                }
            </div>
        </div>
    )
}