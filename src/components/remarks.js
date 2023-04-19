const Remarks = ({results}) => {

    //total everything with conversion from empty string to zero
    const sum = results.reduce((accumulator, object) => {
        return accumulator + parseInt(object.pre_first === "" ? 0 : object.pre_first) + parseInt(object.pre_sec === "" ? 0 : object.pre_sec)  + parseInt(object.pre_exam === "" ? 0 :object.pre_exam)
    }, 0)

    //calculate average
    const ave = sum/results.length

    const comments = []

   switch (true) {
    case (ave >= 90):
            comments.push('This is so brilliant. You are exceptional', 'Excellent performance. You rock')
            break;
        case (ave >= 70 && ave < 89.99):
            comments.push('Very good performance!', 'Keep it up')
            break;
        case (ave >= 60 && ave < 79.99):
            comments.push('Well done. However, look into weak subject areas', 'Good result. Improve of your weak points and you can achieve greater')
            break;
        case (ave >= 50 && ave < 59.99):
            comments.push('You are on the average but you can do better', 'This is not your best. With a little more effort, you can achieve greater heights')
            break;
        case (ave >= 35 && ave < 49.99):
            comments.push('This is not a good performance', 'Work hard to improve your performance')
            break;
        case (ave >= 0 && ave < 34.99):
            comments.push('This is not a good result. You need to sit up', 'You need to be up and doing in order to make significant improvement')
            break;
        default:
            comments.push('N/A')
            break;
   }

    
   const [a, b] = comments
   return (
      <div>
        <tr>
            <td>Form master</td>
            <td>{a}</td>
        </tr>
        <tr>
            <td>Principal</td>
            <td>{b}</td>
        </tr>
      </div>   
    );
    }
    
export default Remarks;
    