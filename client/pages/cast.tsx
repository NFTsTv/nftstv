import type { NextPage } from "next";
import { ViewContextProvider } from "context/viewContext";
import CastComponent from "components/Cast/CastComponent";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import AddressRoute from "components/Elements/Routes/AddressRoute";
import ProtectedRoute from "components/Elements/Routes/ProtectedRoute";
import CastRoute from "components/Elements/Routes/CastRoute";

const Cast: NextPage = () => {
  return (
    <ProtectedRoute>
      <AddressRoute>
        <CastRoute>
          <ViewContextProvider address={""}>
            <Navbar>
              <ViewOnPlatform />
              <ShareButton />
              <CastComponent />
            </Navbar>
          </ViewContextProvider>
        </CastRoute>
      </AddressRoute>
    </ProtectedRoute>
  );
};

export default Cast;
