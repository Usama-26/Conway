import useIsMountedRef from '_hooks/useIsMountedRef';
import Script from 'next/script';
import {useCallback, useEffect} from 'react';
import {modeldata as dataModel} from 'utils/conway-machines';
// function component

const ThreeDView = () => {
  const isMountedRef = useIsMountedRef();

  const loadViewerCode = useCallback(async () => {
    if (isMountedRef.current) {
      window.pathModel = {
        path: [
          {
            path: 'http://127.0.0.1:8887/models/FlightHelmet/glTF/',
            model: 'example_3D_viewer_step_v1',
            type: '.glb',
          },
        ],
      };
      console.log('calling loadViewerCode', window.pathModel);
      const script = document.createElement('script');
      script.src = 'http://127.0.0.1:8887/bundle.main.js';
      script.type = 'module';
      script.async = true;
      script.onload = () => {
        // Viewer code is loaded, you can now initialize the viewer
        initViewer();
      };
      document.body.appendChild(script);
    }
  }, [isMountedRef.current]);

  function initViewer() {
    console.log(window);
    window?.test && window?.test('165,0,0');
    // const modeldata: any = dataModel;
    // if (typeof window.initThreeJSViewer === 'function') {
    //   window.initThreeJSViewer({
    //     // container: document.getElementById('viewer-container'),
    //     modeldataParam: dataModel,
    //     pathModelParam: {
    //       path: [
    //         {
    //           path: 'http://127.0.0.1:8887/models/FlightHelmet/glTF/',
    //           model: 'example_3D_viewer_step_v1',
    //           type: '.glb',
    //         },
    //       ],
    //     },
    //     // Other required assets and configurations
    //   });
    // }
  }

  useEffect(() => {
    loadViewerCode();
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.0.5/gsap.min.js"></Script>
      <div id="loadingModal" className="modals">
        <div className="modal-dialog">
          <div className="modal-contents">
            <div className="modal-body">
              <div className="spinner-border" role="status">
                <div className="loader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="image-container">
        <div className="move"></div>
        <div className="scroll"></div>
        <div className="pan"></div>
        <div className="selectModel"></div>
      </div>

      <div id="mySidebar" className="sidebar" style={{alignItems: 'center'}}>
        <div
          style={{
            backgroundColor: '#ffe583',
            top: '-4rem',
            position: 'relative',
            height: '4rem',
            display: 'flex',
          }}
        >
          <h1
            style={{
              top: '1.2rem',
              marginLeft: '1rem',
              position: 'relative',
              fontSize: 'large',
            }}
          >
            Part information
          </h1>
          <button
            className="expandbtn"
            id="ex32"
            style={{
              width: '20px',
              height: '20px',
              border: 'none',
              backgroundColor: '#ffe583',
            }}
          ></button>{' '}
          <button
            className="shrink"
            id="sh32"
            style={{
              width: '20px',
              height: '20px',
              border: 'none',
              position: 'absolute',
              backgroundColor: '#ffe583',
            }}
          ></button>{' '}
          <a className="closebtn" id="closebtn">
            ×
          </a>
        </div>
        <canvas className="webgl2" id="canvas2"></canvas>
        <br />
        <br />
        <div id="textDiv" style={{position: 'relative'}}>
          <label
            onMouseEnter={() => window?.test && window?.test('255,0,63')}
            onMouseLeave={() => window?.test && window?.test(null)}
            id="partNo"
            style={{marginLeft: '1rem', position: 'relative'}}
          ></label>
          <br />
          <br />
          <label
            id="desc"
            style={{marginLeft: '1rem', position: 'relative'}}
          ></label>
          <br />
          <br />
          <label
            id="itemNo"
            style={{marginLeft: '1rem', position: 'relative'}}
          ></label>
          <br />
          <br />
          <p
            style={{
              marginLeft: '1rem',
              lineHeight: '1.25',
              alignItems: 'center',
              position: 'relative',
            }}
            id="para"
          >
            Conway End fitting Operator Side that goes
            <br />
            into the gripper bars for Bobst die cutters
            <br />
            SP 900 E and SP 900 ER; SP1080 E and
            <br />
            SP 1080 EEG; SPO 1080 E and SPO 1080 EEG; Contact us for a quote.
          </p>
          <br />
          <br />
        </div>
        <div id="btnDiv" style={{position: 'relative'}}>
          <button
            id="decrement"
            style={{
              width: '2rem',
              height: '3rem',
              marginLeft: '3rem',
              marginTop: '5rem',
            }}
          >
            -
          </button>{' '}
          <input
            id="number"
            style={{
              width: '2rem',
              height: '2.7rem',
              textAlign: 'center',
              position: 'relative',
              left: '-.25rem',
            }}
          />{' '}
          <button
            id="increment"
            style={{
              width: '2rem',
              height: '3rem',
              marginLeft: '0',
              position: 'relative',
              left: '-.25rem',
            }}
          >
            +
          </button>
          <button
            className="addCart"
            id="rfq"
            style={{
              width: '10rem',
              height: '3rem',
              marginLeft: '3rem',
              fontSize: 'large',
            }}
          >
            ADD TO RFQ
          </button>
        </div>
      </div>
      <div>
        <canvas className="webgl relative" id="canvas1"></canvas>
      </div>
      <div id="fullscreen-overlay">
        <p className="loadingtypo" id="typo">
          Loading...
        </p>
        <div id="spinner"></div>
      </div>
    </>
  );
};

export default ThreeDView;
