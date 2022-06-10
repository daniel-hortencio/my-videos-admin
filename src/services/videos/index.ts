import { AxiosInstance } from 'axios'
import { api } from '../api'

import { VideoTypes } from "../../types";

class VideoServices {
  constructor(private readonly api: AxiosInstance) { }
  private readonly route = '/videos'

  getAll() {
    return this.api.get(this.route)
  }

  getById(id: string) {
    return this.api.get(this.route, { params: { id } })
  }

  create(videos: Omit<VideoTypes, 'id'>[]) {
    return this.api.post(this.route, { videos })
  }

  update(id: string, video: Omit<VideoTypes, 'id'>) {
    return this.api.put(this.route, video, { params: { id } })
  }

  delete(videoId: string) {
    return this.api.delete(this.route, { params: { id: videoId } })
  }
}

export const videoServices = new VideoServices(api)