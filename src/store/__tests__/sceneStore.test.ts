/**
 * PoseMaster – src/store/__tests__/sceneStore.test.ts
 * Unit tests for Zustand scene store (props, reference images)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useSceneStore, Prop } from '../sceneStore'

describe('sceneStore', () => {
  beforeEach(() => {
    useSceneStore.getState().clearScene()
  })

  it('should initialize empty', () => {
    const state = useSceneStore.getState()
    expect(state.props).toHaveLength(0)
    expect(state.referenceImages).toHaveLength(0)
  })

  it('should add and remove props', () => {
    const store = useSceneStore.getState()
    const prop: Prop = {
      id: 'prop1',
      name: 'Chair',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    }
    store.addProp(prop)
    expect(useSceneStore.getState().props).toHaveLength(1)
    
    store.removeProp('prop1')
    expect(useSceneStore.getState().props).toHaveLength(0)
  })

  it('should update prop properties', () => {
    const store = useSceneStore.getState()
    store.addProp({
      id: 'box1',
      name: 'Box',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    })
    
    store.updateProp('box1', { scale: 2.5 })
    const prop = useSceneStore.getState().getProp('box1')
    expect(prop?.scale).toBe(2.5)
  })

  it('should add reference images', () => {
    const store = useSceneStore.getState()
    store.addReferenceImage({
      id: 'img1',
      url: 'test.jpg',
      position: { x: 0, y: 0, z: -5 },
      scale: 2,
      opacity: 0.8,
    })
    expect(useSceneStore.getState().referenceImages).toHaveLength(1)
  })

  it('should update reference image properties', () => {
    const store = useSceneStore.getState()
    store.addReferenceImage({
      id: 'img2',
      url: 'photo.png',
      position: { x: 0, y: 0, z: 0 },
      scale: 1,
      opacity: 1,
    })
    
    store.updateReferenceImage('img2', { opacity: 0.5 })
    const img = useSceneStore.getState().getReferenceImage('img2')
    expect(img?.opacity).toBe(0.5)
  })

  it('should set active model', () => {
    const store = useSceneStore.getState()
    store.setActiveModel('character-001')
    expect(useSceneStore.getState().activeModelId).toBe('character-001')
  })

  it('should set background color and opacity', () => {
    const store = useSceneStore.getState()
    store.setBackgroundColor('#ff0000')
    store.setBackgroundOpacity(0.7)
    
    const state = useSceneStore.getState()
    expect(state.backgroundColor).toBe('#ff0000')
    expect(state.backgroundOpacity).toBe(0.7)
  })

  it('should clamp opacity between 0 and 1', () => {
    const store = useSceneStore.getState()
    store.setBackgroundOpacity(2)
    expect(useSceneStore.getState().backgroundOpacity).toBe(1)
    store.setBackgroundOpacity(-1)
    expect(useSceneStore.getState().backgroundOpacity).toBe(0)
  })

  it('should clear entire scene', () => {
    const store = useSceneStore.getState()
    store.addProp({
      id: 'p1',
      name: 'Prop',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    })
    store.setActiveModel('test-model')
    
    store.clearScene()
    const state = useSceneStore.getState()
    expect(state.props).toHaveLength(0)
    expect(state.activeModelId).toBeNull()
  })

  it('should serialize and deserialize', () => {
    const store = useSceneStore.getState()
    store.addProp({
      id: 'desk',
      name: 'Desk',
      position: { x: 1, y: 2, z: 3 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 2,
    })
    store.setBackgroundColor('#0000ff')
    
    const json = store.serialize()
    store.clearScene()
    store.deserialize(json)
    
    const state = useSceneStore.getState()
    expect(state.props).toHaveLength(1)
    expect(state.props[0].name).toBe('Desk')
    expect(state.backgroundColor).toBe('#0000ff')
  })

  it('should handle multiple props and images', () => {
    const store = useSceneStore.getState()
    for (let i = 0; i < 3; i++) {
      store.addProp({
        id: `prop${i}`,
        name: `Prop${i}`,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
      })
    }
    for (let i = 0; i < 2; i++) {
      store.addReferenceImage({
        id: `img${i}`,
        url: `image${i}.jpg`,
        position: { x: 0, y: 0, z: 0 },
        scale: 1,
        opacity: 1,
      })
    }
    
    const state = useSceneStore.getState()
    expect(state.props).toHaveLength(3)
    expect(state.referenceImages).toHaveLength(2)
  })
})
