class TasksController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    if request.xhr?
      @tasks = Task.all.includes(:approve, :user)
    else
      render 'list'
    end
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    res = @task.save! rescue false
    if res
      flash[:info] = 'New task was successfully created'
      redirect_to action: 'index'
    else
      render 'new'
    end
  end

  def set_status
    task = Task.find(params[:task_id])
    res = StatusService.new(task, current_user).set(params[:status])
    head :unprocessable_entity and return unless res
    render '_task', :locals => {:task => task}
  end

  def approve
    task = Task.find(params[:task_id])
    res = StatusService.new(task, current_user).approve
    head :unprocessable_entity and return unless res
    render '_task', :locals => {:task => task}
  end

  private

  def task_params
    @task_params ||= params.require(:task).permit(:title, :deadline_at)
  end
end
