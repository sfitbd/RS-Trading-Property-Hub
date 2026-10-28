import{supabase}from'./supabase';
export type Settings={id?:number,business_name:string,tagline:string,hero_kicker:string,hero_title:string,hero_subtitle:string,contact_phone:string,contact_email:string,address:string,office_hours:string,primary_color:string,accent_color:string,meta_title:string,meta_description:string};
export type Slide={id?:number,title:string,subtitle:string,image_url:string,cta_text:string,cta_link:string,sort_order:number,is_active:boolean};
export type Project={id?:number,slug:string,name:string,location:string,project_type:string,summary:string,description:string,hero_image:string,masterplan_image:string,status:string,starting_price:string,total_plots:number,available_plots:number,latitude:string,longitude:string,amenities:string[],legal_notes:string[],sort_order:number,is_active:boolean,is_featured:boolean};
export type Plot={id?:number,project_id:number,plot_code:string,plot_size:string,road_width:string,orientation:string,price:string,status:string,category:string,notes:string,is_active:boolean};
export type Team={id?:number,name:string,role:string,bio:string,photo_url:string,sort_order:number,is_active:boolean};
export type Review={id?:number,name:string,company:string,quote:string,rating:number,verified:boolean,sort_order:number,is_active:boolean};
export type News={id?:number,title:string,slug:string,excerpt:string,body:string,image_url:string,published_at:string,sort_order:number,is_active:boolean};
export const defaults:Settings={business_name:'RS Trading & Property Hub',tagline:'PREMIUM FLATS • LAND & PLOTS • BUY • SELL • INVESTMENT',hero_kicker:'TRUST • LOCATION • GROWTH',hero_title:'Find Your Dream Property for Better Living & Greater Future',hero_subtitle:'Premium flats, land and plots, property marketing, consultancy, buy-sell support and investment-focused real estate services.',contact_phone:'',contact_email:'',address:'',office_hours:'',primary_color:'#0c6b48',accent_color:'#14a36d',meta_title:'RS Trading & Property Hub | Plots & Real Estate Projects',meta_description:'Explore premium flats, land and plots, property marketing, consultancy, buy-sell support and investment opportunities with RS Trading & Property Hub.'};
async function list<T>(table:string){if(!supabase)return[] as T[];const{data}=await supabase.from(table).select('*').eq('is_active',true).order('sort_order');return(data||[])as T[]}
export async function getSettings(){if(!supabase)return defaults;const{data}=await supabase.from('site_settings').select('*').eq('id',1).maybeSingle();return(data||defaults)as Settings}
export const getSlides=()=>list<Slide>('hero_slides');
export const getProjects=()=>list<Project>('projects');
export async function getProject(slug:string){if(!supabase)return null;const{data}=await supabase.from('projects').select('*').eq('slug',slug).eq('is_active',true).maybeSingle();return data as Project|null}
export async function getPlots(project_id?:number){if(!supabase)return[] as Plot[];let q=supabase.from('plots').select('*').eq('is_active',true);if(project_id)q=q.eq('project_id',project_id);const{data}=await q.order('plot_code');return(data||[])as Plot[]}
export const getTeam=()=>list<Team>('team');
export const getReviews=()=>list<Review>('reviews');
export const getNews=()=>list<News>('news');

export type Property={id?:number,title:string,slug:string,property_type:string,location:string,price:string,bedrooms:string,bathrooms:string,size:string,image_url:string,summary:string,status:string,sort_order:number,is_active:boolean,is_featured:boolean};
export type Service={id?:number,title:string,description:string,icon:string,sort_order:number,is_active:boolean};
export async function getProperties(){if(!supabase)return[] as Property[];const{data}=await supabase.from('properties').select('*').eq('is_active',true).order('sort_order');return(data||[])as Property[]}
export async function getServices(){if(!supabase)return[] as Service[];const{data}=await supabase.from('services').select('*').eq('is_active',true).order('sort_order');return(data||[])as Service[]}
