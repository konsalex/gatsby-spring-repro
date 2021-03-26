/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { useSpring, animated } from 'react-spring'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDribbble,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: "250px";
`

const Anchors = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`

const SocialIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function bounceInterp(r) {
  return `translate3d(${3 * Math.sin(r + (2 * Math.PI) / 1.6)}px, ${1 *
    Math.sin(r + (2 * Math.PI) / 1.6)}px,0) rotate(${r * 10}deg)`
}

const Surfer = () =>{
  const { radians } = useSpring({
    from: {
      radians: 2 * Math.PI,
    },
    to: async next => {
      while (1) {
        await next({ radians: 1.3 * Math.PI })
        await next({ radians: 1.5 * Math.PI })
        await next({ radians: 1.2 * Math.PI })
        await next({ radians: 1.6 * Math.PI })
      }
    },
  })
  return (
    <animated.div
      className="script-box"
      style={{
        transform: radians.interpolate(bounceInterp),
        display: 'inline-block',
      }}
    >
      <div>
        <div style={{ zIndex: 10 }}>🏄</div>
      </div>
    </animated.div>
  )
}



const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
       <div>
              <p>
                Hey fellow web surfer <Surfer /> My name is
                <strong>Costa</strong>.
                <br />
                I am a software engineer & product manager.
                <br />
              </p>
              <SocialIcons>
                <FontAwesomeIcon
                  className="social-icon"
                  icon={faTwitter}
                  size="lg"
                />
                <FontAwesomeIcon
                  className="social-icon"
                  icon={faGithub}
                  size="lg"
                />
                <FontAwesomeIcon
                  className="social-icon"
                  icon={faDribbble}
                  size="lg"
                />
              </SocialIcons>
            </div>
    </div>
  )
}

export default Bio
