import React, { useCallback } from 'react'
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = ({url}) => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);
    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);
  return (
    <Particles
            id="tsparticles"
            url={url}
            init={particlesInit}
            loaded={particlesLoaded}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
  )
}

export default ParticlesBackground
