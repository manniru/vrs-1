/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import { Motion, spring } from 'react-motion'

import SliderWave from './SliderWave'
import ScrollIcon from './ScrollIcon'
import ShowBox from './ShowBox'
import Footer from './Footer'

import sliderStyles from '../styles/slider.less'

const Page = ({children, fixed}) =>
  <div className={`slider-item ${fixed ? 'fixed' : 'relative slide'}`}>{children}</div>

class Slider extends Component {
  constructor() {
    super()
    this.state = {
      offset: 0
    }
    this.scrollHandler = this.scrollHandler.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler, false)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }
  scrollHandler() {
    this.setState({
      offset: window.scrollY || 0
    })
  }
  render() {
    const height = typeof window === 'undefined' ? 0 : window.innerHeight
    const width = typeof window === 'undefined' ? 0 : window.innerWidth
    const { offset } = this.state

    return <div>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      </Head>

      <div className="slider-container">
        <Page fixed={true}>
          <SliderWave/>
          <ScrollIcon key="scroll-icon"/>
        </Page>
        <Page>
          <div className="absolute w-100 vh-100">
            <article className="vh-100 dt w-100">
              <div className="dtc v-mid tc white ph3 ph4-l">
                <Motion defaultStyle={{y: -50, o: 0}} style={{y: spring(0), o: spring(1)}}>
                  {
                    style =>
                      <h2 className="f1 fw6 tc ttu f-subheadline-l mb3" style={{
                        transform: `translateY(${style.y}px)`,
                        opacity: style.o
                      }}>V R S</h2>
                  }
                </Motion>
                <i className="f5 tracked-mega-l">virtual reality shop</i>
              </div>
            </article>
          </div>
        </Page>
        <Page>
          <div className="absolute w-100 vh-100">
            <article className="vh-100-l dt w-100 w-70-l" key="title-1">
              <div className="dtc v-mid white ph3 ph4-l">
                {
                  (offset < height * 2 + 100) ?
                    <Motion defaultStyle={{y: height * .3}} style={{y: spring(height * .3 - offset * .3)}}>
                      {
                        style =>
                          <h2 className="f1 f2-m fw6 tc-l tc ttu" style={{
                            transform: `translateY(${style.y}px)`
                          }}>Online 3D modeling</h2>
                      }
                    </Motion> : <h2 className="f1 f2-m fw6 tc-l tc ttu">Online 3D modeling</h2>
                }
              </div>
            </article>
            <article className="vh-100-l absolute-l top-0 right-0 dt w-100 w-50-l">
              <div className="dtc v-mid tl-l tc" style={{ height: 600 }}>
                <ShowBox width={Math.min(600, width)} height={600} composer={function () {
                  let effect = new THREE.RenderPass(this.scene, this.camera)
                  effect.renderToScreen = true
                  this.composer.addPass(effect)
                }}/>
              </div>
            </article>
          </div>
        </Page>
        <Page>
          <div className="absolute w-100 vh-100">
            <article className="vh-100-l dt w-100 absolute-l" style={{ mixBlendMode: 'screen' }}>
              <div className="dtc v-mid tc" style={{ height: 600 }}>
                <ShowBox width={Math.min(600, width)} height={600} composer={function () {
                  let effect = new THREE.RenderPass(this.scene, this.camera)
                  // effect.renderToScreen = true
                  this.composer.addPass(effect)

                  effect = new THREE.ShaderPass(THREE.EdgeShader)
                  effect.uniforms.aspect.value = new THREE.Vector2(500, 500)
                  effect.renderToScreen = true
                  this.composer.addPass(effect)
                }}/>
              </div>
            </article>
            <article className="vh-100-l dt w-100" key="title-2">
              <div className="dtc v-mid white ph3 ph4-l">
                {
                  (offset > height - 100) ? <Motion defaultStyle={{y: height * .8}} style={{y: spring(height * .8 - offset * .4)}}>
                    {
                      style =>
                        <h2 className="f1 f2-m fw6 tc ttu" style={{
                          transform: `translateY(${style.y}px)`
                        }}>Customize your model</h2>
                    }
                  </Motion> : <h2 className="f1 f2-m fw6 tc ttu">Customize your model</h2>
                }
              </div>
            </article>
          </div>
        </Page>
        <Page>
          <div className="absolute w-100 vh-100">
            <article className="vh-100-l dt w-100 w-70-l absolute-l top-0 right-0" key="title-3">
              <div className="dtc v-mid white ph3 ph4-l">
                {
                  (offset > height * 2 - 100) ?
                    <Motion defaultStyle={{y:height}} style={{y: spring(height - offset * .33)}}>
                      {
                        style =>
                          <h2 className="f1 f2-m fw6 tl-l tc ttu" style={{
                            transform: `translateY(${style.y}px)`
                          }}>Design for virtual reality</h2>
                      }
                    </Motion> : <h2 className="f1 f2-m fw6 tl-l tc ttu">Design for virtual reality</h2>
                }
              </div>
            </article>
            <article className="vh-100-l vh-75 dt w-100 w-50-l" style={{ mixBlendMode: 'screen' }}>
              <div className="dtc v-mid tr-l tc" style={{ height: 600 }}>
                <ShowBox width={Math.min(600, width)} height={600} composer={function () {
                  let effect = new THREE.RenderPass(this.scene, this.camera)
                  // effect.renderToScreen = true
                  this.composer.addPass(effect)

                  effect = new THREE.ShaderPass(THREE.RGBShiftShader)
                  effect.uniforms.amount.value = 0.03
                  effect.renderToScreen = true
                  this.composer.addPass(effect)
                }}/>
              </div>
            </article>
          </div>
        </Page>
        <Footer/>
      </div>
    </div>
  }
}

export default Slider