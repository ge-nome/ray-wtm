import { useState, useEffect} from 'react';
import logo from './images/logo.jpg'
import Total from './components/resultComp';
import Gtotal from './components/gtotal';
// import axios from 'axios';
import Grade from './components/grade';
import Remarks from './components/remarks';
import load from './images/loading.gif'

const Display = () => {

  const [affective, setAffective] = useState([])
  const [psych, setPsych] = useState([])
  const [result, setResult] = useState([])
  const [bio, setBio] = useState([])
  const [classlist, setClasslist] = useState([])
  const [status, setStatus] = useState([])
  const [total_r, settotal_r] = useState([])
  const [sums, setsums] = useState('')
  const [position, setposition] = useState(0)
  useEffect(() => {
    const resultsGetter = async () => {
      fetchTasks()
    }
    resultsGetter()
  }, []);

  useEffect(() => {
    posit()
  }, [sums])

  useEffect(() => {
    sumit()
  }, [total_r])

  const sumit = () => {
    setsums( result.reduce((accumulator, object) => {
      return accumulator + parseInt(object.pre_first === "" ? 0 : object.pre_first) + parseInt(object.pre_sec === "" ? 0 : object.pre_sec) + parseInt(object.pre_exam === "" ? 0 :object.pre_exam)
  }, 0))
  }
  const posit=()=>{
    const posindex = total_r.findIndex(item => item.total === sums)

    console.log(total_r)
    console.log(posindex)

    if (posindex === 0 || total_r.length <= 1){
        setposition('1st')
    }
    else if (posindex === 1){
        setposition('2nd')
    }
    else if (posindex === 2){
        setposition(posindex+1+'rd')
    }
    else{
      setposition(posindex+1+'th')
    }
  }
  const fetchTasks = async () => {

    const details = JSON.parse(localStorage.getItem('details'));
    const{adno, acads, term} = details;
    
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'adno': adno,
      'acads': acads,
      'term': term 
    });

    // start of config1
    var config1 = {
      method: 'post',
      url: 'http://192.168.0.102:8000/api/results',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config1)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      const stature = [response.data]

      console.log(response.data)
      const [one] = stature
      const {affect, allowed, bio, classlist, psych, results, total} = one
      console.log(results)
        setAffective(affect)
        setBio(bio)
        setClasslist(classlist)
        setPsych(psych)
        setResult(results)
        setStatus(allowed)
        settotal_r(total)

      // setResult(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    // end of config1

  }


  if (status === 1) {
    const [inner] = bio
    const {pre_adm_no, pre_sname, pre_fname, pre_pass} = inner
    const [first] = result
    const {pre_class, pre_term, pre_acad} = first
    
       return (
        <div className="results">
          <div className='topbar'>
            <div className='logo'>
              <img src={logo} alt="logo"></img>
            </div>
            <div className='schName'>
              <h1>PRECIOUS GIFT INTERNATIONAL SCHOOL</h1>
              <p>MARARABA, NASARAWA STATE</p>
            </div>
          </div>
          <hr></hr>
          <div className='bio' style={{marginBottom:'50px'}}>
            <div className='left'>
              <table>
                <tr>
                  <td>Name</td>
                  <td>{pre_sname +" "+ pre_fname}</td>
                </tr>
                <tr>
                  <td>Admission No</td>
                  <td>{
                    pre_adm_no
                  }</td>
                </tr>
                <tr>
                  <td>Academic Session</td>
                  <td>{
                    pre_acad
                  }</td>
                </tr>
                <tr>
                  <td>Term</td>
                  <td>{
                    pre_term
                  }</td>
                </tr>
                <tr>
                  <td>Class</td>
                  <td>{pre_class}</td>
                </tr>
              </table>
            </div>
            <div className='middle'>
              <table>
                <Gtotal results={result}  list={classlist} posi={position} fund={sums}/>
              </table>
            </div>
          </div>
          {
            pre_class.split(' ')[0] === 'JSS' || pre_class.split(' ')[0] === 'SSS' ?
            <div className='tablesec'>
            <h1>Curricular Performance</h1>
            <table>
              <tr>
                <th>SUBJECT</th>
                <th>C.A. 1</th>
                <th>C.A. 2</th>
                <th>C.A. 3</th>
                <th>EXAMS</th>
                <th>TOTAL</th>
                <th>GRADE</th>
              </tr>
              { result ? result.map((result) => (
                <tr >
                  <td>{result.pre_subject}</td>
                  <td>{result.pre_first ? result.pre_first : "ABS"}</td>
                  <td>{result.pre_sec ? result.pre_sec : "ABS"}</td>
                  <td>{result.pre_third ? result.pre_third : "ABS"}</td>
                  <td>{result.pre_exam ? result.pre_exam : "ABS"}</td>
                  <Total one={result.pre_first} two={result.pre_sec} three={result.pre_third} exam={result.pre_exam}/>
                  <Grade one={result.pre_first} two={result.pre_sec} three={result.pre_third} exam={result.pre_exam}/>
                </tr>
              )) : ''}
              
            </table>
            </div>
            :
            <div className='table' style={{marginBottom:'50px'}}>
              <h1>Curricular Performance</h1>
              <table>
                <tr>
                  <th>SUBJECT</th>
                  <th>C.A. 1</th>
                  <th>C.A. 2</th>
                  <th>EXAMS</th>
                  <th>TOTAL</th>
                  <th>GRADE</th>
                </tr>
                { result ? result.map((result) => (
                  <tr >
                    <td>{result.pre_subject}</td>
                    <td>{result.pre_first ? result.pre_first : "ABS"}</td>
                    <td>{result.pre_sec ? result.pre_sec : "ABS"}</td>
                    <td>{result.pre_exam ? result.pre_exam : "ABS"}</td>
                    <Total one={result.pre_first} two={result.pre_sec} three={result.pre_third} exam={result.pre_exam}/>
                    <Grade one={result.pre_first} two={result.pre_sec} three={result.pre_third} exam={result.pre_exam}/>
                  </tr>
                )) : ''}
                
              </table>
            </div>
          }
          
          
          <div>
            <h1>Extracurricular Performance</h1>
         
            <div className='extra'>

            
              <div className='affective'>
              <h2>Affective</h2>
                <table>
                  {affective.map(affective => (
                    <tr>
                      <td>{affective.quality}</td>
                      <td>{affective.score}</td>
                    </tr>
                    ))
                  }   
                </table>
              </div>
              <div className='psych'>
              <h2>Psychomotor</h2>
                <table>
                  {psych.map(psych => (
                    <tr>
                      <td>{psych.quality}</td>
                      <td>{psych.score}</td>
                    </tr>
                    ))
                  }   
                </table>
              </div>
            </div>
          </div>
          <div className='comments'>
          <h1>Comments</h1>
            <table>
              <Remarks results={result} />
            </table>
          </div>

          <div className='signature'>
            <p>Authorized Signature</p>
            <hr></hr>
          </div>
        </div>
      );
    }
    else if(status === 2){
     
      return (
        <div className='warning'> 
          <p>Your are still owing school fees</p>
        </div>
      );
    }
    else{
     
      return (
        <div className='loading'> 
          <img src={load} alt=''/>
        </div>
      );
    }
    }
    
    export default Display;
    