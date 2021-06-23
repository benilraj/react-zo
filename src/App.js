import {Route , BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import CollegeIndex from "./pages/college/CollegeIndex"; 
import GameStudentList from "./pages/college/GameStudentList";
import TokenValidator from "./TokenValidator";
import EligibilityPerforma from "./pages/college/EligibilityPerforma";
import ViewEligibilityPerforma from "./pages/college/ViewEligibilityPerforma";
import QrScanner from "./pages/zonal-coordinator/QrScanner";
import Event from "./pages/zonal-coordinator/Event";
import VerifyEligibilityPerforma from "./pages/zonal-coordinator/VerifyEligibilityPerforma";
import Index from "./pages/zonal-coordinator/Index";
import EventRegistrationDetails from "./pages/zonal-coordinator/EventRegistrationDetails";
import EventColleges from "./pages/zonal-coordinator/EventColleges";
import PublishResult from "./pages/zonal-coordinator/PublishResult";
import CouncilMembers from "./pages/zonal-coordinator/CouncilMembers";
import AdminIndex from "./pages/admin/AdminIndex";
import Zone from "./pages/admin/Zone";
import Zonalcoordinator from "./pages/admin/Zonalcoordinator";
import AssignZonalcoordinator from "./pages/admin/AssignZonalcoordinator";
import SuperAdminIndex from "./pages/super-admin/SuperAdminIndex";
import AdminDetails from "./pages/super-admin/AdminDetails";
import AddAdmin from "./pages/super-admin/AddAdmin";
import College from "./pages/admin/College";
import AddCollege from "./pages/admin/AddCollege";
import Game from "./pages/admin/Game";
import AddGame from "./pages/admin/AddGame";
import AddCouncilMembers from "./pages/zonal-coordinator/AddCouncilMembers";
import CollegeEditProfile from "./pages/college/CollegeEditProfile";
import EditBasicInformation from "./pages/college/EditBasicInformation";
import CollegeDetails from "./pages/zonal-coordinator/CollegeDetails";
import CollegeInfrastructure from "./pages/zonal-coordinator/CollegeInfrastructure";
import Fixtures from "./pages/zonal-coordinator/Fixtures";
import ConfrimFixtures from "./pages/zonal-coordinator/ConfrimFixtures";
import ChangeZonalcoordinator from "./pages/admin/ChangeZonalCoordinator";
import EditCollege from "./pages/admin/EditCollege";
import EditProfileAdmin from "./pages/admin/EditProfile";
import EditCouncilMembers from "./pages/zonal-coordinator/EditCouncilMembers";
import EditGame from "./pages/admin/EditGame";
import EditProfileSuper from "./pages/super-admin/EditProfileSuper";
import EditAdmin from "./pages/super-admin/EditAdmin";
import ChangeEvent from "./pages/zonal-coordinator/ChangeEvent";
import Results from "./pages/admin/Results";
import ZonalCoordinatorEditProfile from "./pages/zonal-coordinator/ZonalCoordinatorEditProfile";

function App() {
 
  return (
     
    <Router>
        <Route path="/" exact component={Login} />

        <Route path="/superadmin/home"  component={SuperAdminIndex} />
        <Route path="/superadmin/admin"  component={AdminDetails} />
        <Route path="/superadmin/newadmin"  component={AddAdmin} />
        <Route path="/superadmin/editadmin"  component={EditAdmin} />
        <Route path="/superadmin/editprofile" component={EditProfileSuper}/>


        <Route path="/admin/home"  component={AdminIndex} />
        <Route path="/admin/zone"  component={Zone} />
        <Route path="/admin/zonalcoordinator"  component={Zonalcoordinator} />
        <Route path="/admin/assignzonalcoordinator"  component={AssignZonalcoordinator} />
        <Route path="/admin/changezonalcoordinator"  component={ChangeZonalcoordinator} />
        <Route path="/admin/college"  component={College} />
        <Route path="/admin/addcollege"  component={AddCollege} />
        <Route path="/admin/editcollege"  component={EditCollege} />
        <Route path="/admin/games"  component={Game} />
        <Route path="/admin/addgame"  component={AddGame} />
        <Route path="/admin/editgame"  component={EditGame} />
        <Route path="/admin/editprofile"  component={EditProfileAdmin} />
        <Route path="/admin/results"  component={Results} />




         <Route path="/college/home"  component={CollegeIndex} />
         <Route path="/college/game"  component={GameStudentList} />
          <Route path="/college/eligibilityperforma/create"  component={EligibilityPerforma}/>
          <Route path="/college/eligibilityperforma/view" component={ViewEligibilityPerforma}/>
          <Route path="/college/editprofile" component={CollegeEditProfile}/>
          <Route path="/college/editbasicinformation" component={EditBasicInformation}/>



         <Route path="/token"  component={TokenValidator} />


         <Route path="/zonalcoordinator" exact  component={Index} />
         <Route path="/zonalcoordinator/qr"   component={QrScanner} />
         <Route path="/zonalcoordinator/verify"  component={VerifyEligibilityPerforma} />
         <Route path="/zonalcoordinator/event" exact  component={Event} />
         <Route path="/zonalcoordinator/changeevent" component={ChangeEvent}/>
         <Route path="/zonalcoordinator/event/registrationdetails"  component={EventRegistrationDetails} />
         <Route path="/zonalcoordinator/event/eventcolleges"  component={EventColleges} />
         <Route path="/zonalcoordinator/event/results"  component={PublishResult} />
         <Route path="/zonalcoordinator/councilmembers"  component={CouncilMembers} />
         <Route path="/zonalcoordinator/addcouncilmembers"  component={AddCouncilMembers} />
         <Route path="/zonalcoordinator/editcouncilmembers"  component={EditCouncilMembers} />
         <Route path="/zonalcoordinator/collegedetails"  component={CollegeDetails} />
         <Route path="/zonalcoordinator/collegeinfrastructure"  component={CollegeInfrastructure} />
         <Route path="/zonalcoordinator/fixtures" exact  component={Fixtures} />
         <Route path="/zonalcoordinator/fixtures/confrim"  component={ConfrimFixtures} />
         <Route path="/zonalcoordinator/editprofile"   component={ZonalCoordinatorEditProfile} />


      

    </Router>
    
  );
}

export default App;
