--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assessments_assessment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_assessment (
    id bigint NOT NULL,
    skill_name character varying(100) NOT NULL,
    passed_by integer NOT NULL,
    taken_by integer NOT NULL,
    image_link character varying(200)
);


--
-- Name: assessments_assessment_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_assessment_categories (
    id bigint NOT NULL,
    assessment_id bigint NOT NULL,
    category_id bigint NOT NULL
);


--
-- Name: assessments_assessment_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_assessment_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_assessment_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_assessment_categories_id_seq OWNED BY public.assessments_assessment_categories.id;


--
-- Name: assessments_assessment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_assessment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_assessment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_assessment_id_seq OWNED BY public.assessments_assessment.id;


--
-- Name: assessments_assessment_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_assessment_roles (
    id bigint NOT NULL,
    assessment_id bigint NOT NULL,
    role_id bigint NOT NULL
);


--
-- Name: assessments_assessment_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_assessment_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_assessment_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_assessment_roles_id_seq OWNED BY public.assessments_assessment_roles.id;


--
-- Name: assessments_option; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_option (
    id bigint NOT NULL,
    description text NOT NULL
);


--
-- Name: assessments_option_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_option_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_option_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_option_id_seq OWNED BY public.assessments_option.id;


--
-- Name: assessments_quesoption; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_quesoption (
    id bigint NOT NULL,
    is_correct boolean NOT NULL,
    option_id bigint NOT NULL,
    question_id bigint NOT NULL
);


--
-- Name: assessments_quesoption_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_quesoption_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_quesoption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_quesoption_id_seq OWNED BY public.assessments_quesoption.id;


--
-- Name: assessments_question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments_question (
    id bigint NOT NULL,
    description text NOT NULL,
    "time" integer NOT NULL,
    points integer NOT NULL,
    difficulty_level character varying(1) NOT NULL,
    assessment_id bigint NOT NULL
);


--
-- Name: assessments_question_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assessments_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assessments_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assessments_question_id_seq OWNED BY public.assessments_question.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: discussions_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussions_comments (
    id bigint NOT NULL,
    comment text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    discussion_id bigint NOT NULL,
    parent character varying(100),
    user_id integer,
    hash character varying(100)
);


--
-- Name: discussions_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.discussions_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discussions_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.discussions_comments_id_seq OWNED BY public.discussions_comments.id;


--
-- Name: discussions_discussion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussions_discussion (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    upvotes integer NOT NULL,
    downvotes integer NOT NULL,
    views integer NOT NULL,
    comment_count integer NOT NULL,
    user_id integer,
    tags character varying(100)[]
);


--
-- Name: discussions_discussion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.discussions_discussion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discussions_discussion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.discussions_discussion_id_seq OWNED BY public.discussions_discussion.id;


--
-- Name: discussions_downvoted; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussions_downvoted (
    id bigint NOT NULL,
    discussion_id bigint NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: discussions_downvoted_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.discussions_downvoted_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discussions_downvoted_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.discussions_downvoted_id_seq OWNED BY public.discussions_downvoted.id;


--
-- Name: discussions_upvoted; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussions_upvoted (
    id bigint NOT NULL,
    discussion_id bigint NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: discussions_upvoted_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.discussions_upvoted_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discussions_upvoted_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.discussions_upvoted_id_seq OWNED BY public.discussions_upvoted.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


--
-- Name: problems_bookmark; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_bookmark (
    id bigint NOT NULL,
    date_added timestamp with time zone NOT NULL,
    problem_id bigint NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: problems_bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_bookmark_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_bookmark_id_seq OWNED BY public.problems_bookmark.id;


--
-- Name: problems_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_category (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


--
-- Name: problems_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_category_id_seq OWNED BY public.problems_category.id;


--
-- Name: problems_company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_company (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


--
-- Name: problems_company_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_company_id_seq OWNED BY public.problems_company.id;


--
-- Name: problems_inputoutput; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_inputoutput (
    id bigint NOT NULL,
    input text NOT NULL,
    output text NOT NULL,
    points integer NOT NULL,
    problem_id bigint NOT NULL
);


--
-- Name: problems_inputoutput_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_inputoutput_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_inputoutput_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_inputoutput_id_seq OWNED BY public.problems_inputoutput.id;


--
-- Name: problems_problem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_problem (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    time_limit numeric(5,2) NOT NULL,
    memory_limit integer NOT NULL,
    difficulty character varying(20) NOT NULL,
    submission_count integer NOT NULL,
    solve_count integer NOT NULL
);


--
-- Name: problems_problem_companies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_problem_companies (
    id bigint NOT NULL,
    problem_id bigint NOT NULL,
    company_id bigint NOT NULL
);


--
-- Name: problems_problem_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_problem_companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_problem_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_problem_companies_id_seq OWNED BY public.problems_problem_companies.id;


--
-- Name: problems_problem_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_problem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_problem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_problem_id_seq OWNED BY public.problems_problem.id;


--
-- Name: problems_problem_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_problem_roles (
    id bigint NOT NULL,
    problem_id bigint NOT NULL,
    role_id bigint NOT NULL
);


--
-- Name: problems_problem_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_problem_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_problem_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_problem_roles_id_seq OWNED BY public.problems_problem_roles.id;


--
-- Name: problems_problem_subcategories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_problem_subcategories (
    id bigint NOT NULL,
    problem_id bigint NOT NULL,
    subcategory_id bigint NOT NULL
);


--
-- Name: problems_problem_subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_problem_subcategories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_problem_subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_problem_subcategories_id_seq OWNED BY public.problems_problem_subcategories.id;


--
-- Name: problems_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_role (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


--
-- Name: problems_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_role_id_seq OWNED BY public.problems_role.id;


--
-- Name: problems_solution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_solution (
    id bigint NOT NULL,
    code text NOT NULL,
    language character varying(20) NOT NULL,
    runtime character varying(20) NOT NULL,
    memory_usage character varying(20) NOT NULL,
    solve_status character varying(50) NOT NULL,
    problem_id bigint NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: problems_solution_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_solution_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_solution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_solution_id_seq OWNED BY public.problems_solution.id;


--
-- Name: problems_subcategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.problems_subcategory (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    category_id bigint NOT NULL
);


--
-- Name: problems_subcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.problems_subcategory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: problems_subcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.problems_subcategory_id_seq OWNED BY public.problems_subcategory.id;


--
-- Name: users_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_user (
    user_ptr_id integer NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    about text NOT NULL,
    occupation character varying(100) NOT NULL,
    current_workplace character varying(100) NOT NULL,
    website_link character varying(200) NOT NULL,
    github_link character varying(200) NOT NULL,
    languages character varying(100)[],
    skills character varying(100)[]
);


--
-- Name: assessments_assessment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment ALTER COLUMN id SET DEFAULT nextval('public.assessments_assessment_id_seq'::regclass);


--
-- Name: assessments_assessment_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_categories ALTER COLUMN id SET DEFAULT nextval('public.assessments_assessment_categories_id_seq'::regclass);


--
-- Name: assessments_assessment_roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_roles ALTER COLUMN id SET DEFAULT nextval('public.assessments_assessment_roles_id_seq'::regclass);


--
-- Name: assessments_option id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_option ALTER COLUMN id SET DEFAULT nextval('public.assessments_option_id_seq'::regclass);


--
-- Name: assessments_quesoption id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_quesoption ALTER COLUMN id SET DEFAULT nextval('public.assessments_quesoption_id_seq'::regclass);


--
-- Name: assessments_question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_question ALTER COLUMN id SET DEFAULT nextval('public.assessments_question_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: discussions_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_comments ALTER COLUMN id SET DEFAULT nextval('public.discussions_comments_id_seq'::regclass);


--
-- Name: discussions_discussion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_discussion ALTER COLUMN id SET DEFAULT nextval('public.discussions_discussion_id_seq'::regclass);


--
-- Name: discussions_downvoted id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_downvoted ALTER COLUMN id SET DEFAULT nextval('public.discussions_downvoted_id_seq'::regclass);


--
-- Name: discussions_upvoted id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_upvoted ALTER COLUMN id SET DEFAULT nextval('public.discussions_upvoted_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: problems_bookmark id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_bookmark ALTER COLUMN id SET DEFAULT nextval('public.problems_bookmark_id_seq'::regclass);


--
-- Name: problems_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_category ALTER COLUMN id SET DEFAULT nextval('public.problems_category_id_seq'::regclass);


--
-- Name: problems_company id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_company ALTER COLUMN id SET DEFAULT nextval('public.problems_company_id_seq'::regclass);


--
-- Name: problems_inputoutput id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_inputoutput ALTER COLUMN id SET DEFAULT nextval('public.problems_inputoutput_id_seq'::regclass);


--
-- Name: problems_problem id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem ALTER COLUMN id SET DEFAULT nextval('public.problems_problem_id_seq'::regclass);


--
-- Name: problems_problem_companies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_companies ALTER COLUMN id SET DEFAULT nextval('public.problems_problem_companies_id_seq'::regclass);


--
-- Name: problems_problem_roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_roles ALTER COLUMN id SET DEFAULT nextval('public.problems_problem_roles_id_seq'::regclass);


--
-- Name: problems_problem_subcategories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_subcategories ALTER COLUMN id SET DEFAULT nextval('public.problems_problem_subcategories_id_seq'::regclass);


--
-- Name: problems_role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_role ALTER COLUMN id SET DEFAULT nextval('public.problems_role_id_seq'::regclass);


--
-- Name: problems_solution id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_solution ALTER COLUMN id SET DEFAULT nextval('public.problems_solution_id_seq'::regclass);


--
-- Name: problems_subcategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_subcategory ALTER COLUMN id SET DEFAULT nextval('public.problems_subcategory_id_seq'::regclass);


--
-- Data for Name: assessments_assessment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_assessment (id, skill_name, passed_by, taken_by, image_link) FROM stdin;
4	Java	10	20	https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/800px-Java_programming_language_logo.svg.png
\.


--
-- Data for Name: assessments_assessment_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_assessment_categories (id, assessment_id, category_id) FROM stdin;
\.


--
-- Data for Name: assessments_assessment_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_assessment_roles (id, assessment_id, role_id) FROM stdin;
9	4	5
10	4	6
\.


--
-- Data for Name: assessments_option; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_option (id, description) FROM stdin;
\.


--
-- Data for Name: assessments_quesoption; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_quesoption (id, is_correct, option_id, question_id) FROM stdin;
\.


--
-- Data for Name: assessments_question; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments_question (id, description, "time", points, difficulty_level, assessment_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add Token	7	add_token
26	Can change Token	7	change_token
27	Can delete Token	7	delete_token
28	Can view Token	7	view_token
29	Can add token	8	add_tokenproxy
30	Can change token	8	change_tokenproxy
31	Can delete token	8	delete_tokenproxy
32	Can view token	8	view_tokenproxy
33	Can add discussion	9	add_discussion
34	Can change discussion	9	change_discussion
35	Can delete discussion	9	delete_discussion
36	Can view discussion	9	view_discussion
37	Can add comments	10	add_comments
38	Can change comments	10	change_comments
39	Can delete comments	10	delete_comments
40	Can view comments	10	view_comments
41	Can add upvoted	11	add_upvoted
42	Can change upvoted	11	change_upvoted
43	Can delete upvoted	11	delete_upvoted
44	Can view upvoted	11	view_upvoted
45	Can add downvoted	12	add_downvoted
46	Can change downvoted	12	change_downvoted
47	Can delete downvoted	12	delete_downvoted
48	Can view downvoted	12	view_downvoted
49	Can add user	13	add_user
50	Can change user	13	change_user
51	Can delete user	13	delete_user
52	Can view user	13	view_user
53	Can add category	14	add_category
54	Can change category	14	change_category
55	Can delete category	14	delete_category
56	Can view category	14	view_category
57	Can add company	15	add_company
58	Can change company	15	change_company
59	Can delete company	15	delete_company
60	Can view company	15	view_company
61	Can add problem	16	add_problem
62	Can change problem	16	change_problem
63	Can delete problem	16	delete_problem
64	Can view problem	16	view_problem
65	Can add role	17	add_role
66	Can change role	17	change_role
67	Can delete role	17	delete_role
68	Can view role	17	view_role
69	Can add sub category	18	add_subcategory
70	Can change sub category	18	change_subcategory
71	Can delete sub category	18	delete_subcategory
72	Can view sub category	18	view_subcategory
73	Can add solution	19	add_solution
74	Can change solution	19	change_solution
75	Can delete solution	19	delete_solution
76	Can view solution	19	view_solution
77	Can add input output	20	add_inputoutput
78	Can change input output	20	change_inputoutput
79	Can delete input output	20	delete_inputoutput
80	Can view input output	20	view_inputoutput
81	Can add book mark	21	add_bookmark
82	Can change book mark	21	change_bookmark
83	Can delete book mark	21	delete_bookmark
84	Can view book mark	21	view_bookmark
85	Can add assessment	22	add_assessment
86	Can change assessment	22	change_assessment
87	Can delete assessment	22	delete_assessment
88	Can view assessment	22	view_assessment
89	Can add option	23	add_option
90	Can change option	23	change_option
91	Can delete option	23	delete_option
92	Can view option	23	view_option
93	Can add question	24	add_question
94	Can change question	24	change_question
95	Can delete question	24	delete_question
96	Can view question	24	view_question
97	Can add ques option	25	add_quesoption
98	Can change ques option	25	change_quesoption
99	Can delete ques option	25	delete_quesoption
100	Can view ques option	25	view_quesoption
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
3	pbkdf2_sha256$320000$6x9hMAIVVFceiYq0iHdtIZ$DPEHJPoOaE6LGXG0GUumH+DgNY8y9sLsS/hnALcpOi0=	\N	f	mashiat	mashiat	mustaq	mashiat@gmail.com	f	t	2022-07-16 17:11:32.353987+00
4	pbkdf2_sha256$320000$4cNa55cpt50XFrHDX9M4Gb$9D/hHZk2+xtJCP6UFscPDQ2kUqX5cv2iFSag3N4u5xI=	\N	f	najib	najibul	haque sarker	nhs@gmail.com	f	t	2022-07-31 00:26:38.268155+00
1	pbkdf2_sha256$320000$7pCSTGhKmhYUXqfZA1zvec$ZjVTD2Ny4dlQtEBxz/RhH4giC95my5xKMe+2ss97aUg=	\N	f	ramisa	ramisa	alam	ramisa@gmail.com	f	t	2022-07-16 16:49:41.502398+00
5	pbkdf2_sha256$320000$Kj9AxZs4d1jmb5TXkNw0dt$ZWoacQ+z+rAgNk6Hk76DC/K+PZ68dlRCSJaznh+nVCo=	\N	f	naeem	naeem	ahmed	naeem@gmail.com	f	t	2022-08-25 05:57:32.787293+00
2	pbkdf2_sha256$320000$wleBtjkguUW7xDplwxgEse$Un/cNT4z6LmFMgDKA3vRoB5TVOSiku2PRFLzHbMaacY=	\N	f	fahim	fahim	hakim	fahim@gmail.com	f	t	2022-07-16 17:03:50.314655+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
28f8fdff978fb89d333ad971e9e87c1cc96c65b5	2022-07-16 16:49:53.888033+00	1
b1cf0b4e7f7cad8bb845df157c3f976669a2e0c2	2022-07-16 17:04:12.065342+00	2
40f603f58fce7dbd2c85f4233cdecdafdf97e435	2022-07-16 17:11:36.136425+00	3
55ed44f3f39330000bee72aff97fc4e97d95fdd5	2022-07-31 00:26:54.951995+00	4
a8fe93de32b349062c136d358b936fed869b4bcd	2022-08-25 05:57:41.49695+00	5
\.


--
-- Data for Name: discussions_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.discussions_comments (id, comment, created_at, updated_at, discussion_id, parent, user_id, hash) FROM stdin;
1	<p>Great Post. Loved it!</p>	2022-07-16 17:04:34.782583+00	2022-07-16 17:04:34.782601+00	1	\N	2	1353ce8b-ceb8-41be-87fc-e261674695ff
2	<p>Thanks for sharing</p>	2022-07-16 17:04:42.17359+00	2022-07-16 17:04:42.173609+00	1	\N	2	30a16f43-ee28-458c-b216-938c9bf22dbb
3	<p>Agree with you</p>	2022-07-16 17:50:19.532247+00	2022-07-16 17:50:19.532263+00	1	1353ce8b-ceb8-41be-87fc-e261674695ff	3	0a38be62-81e7-4636-aa83-337ec8e2cf4c
4	<p>Thanks!!!</p>	2022-07-16 17:50:27.709365+00	2022-07-16 17:50:27.70942+00	1	\N	3	c5e828d6-3dd1-4e96-978f-877dbfe31e24
5	<p>DP is hard :)</p>	2022-07-17 03:19:09.742002+00	2022-07-17 03:19:09.742043+00	7	\N	3	143baf28-8043-4364-afa9-7baa09fce71f
6	<p>nice insight</p>	2022-07-17 07:46:06.18384+00	2022-07-17 07:46:06.184773+00	15	\N	3	e239759b-1317-470b-b6fe-b36335913044
7	<p>sad</p>	2022-07-17 09:32:07.167535+00	2022-07-17 09:32:07.168846+00	7	\N	1	0fe6a6fd-0107-4d8d-b82c-003488eb179e
8	<p>you are right</p>	2022-07-17 09:32:15.044423+00	2022-07-17 09:32:15.044466+00	7	143baf28-8043-4364-afa9-7baa09fce71f	1	ae76e634-4efc-43c2-87de-473efc54886f
9	<p><strong><em>dasd</em></strong></p>	2022-07-17 09:32:48.88489+00	2022-07-17 09:32:48.884917+00	7	\N	1	da940382-de17-4b02-b64c-d39d5a3d3f3f
\.


--
-- Data for Name: discussions_discussion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.discussions_discussion (id, title, description, created_at, updated_at, upvotes, downvotes, views, comment_count, user_id, tags) FROM stdin;
7	Blind 75 Dynamic Programming	### **Dynamic Programming**\n\n- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)\n- [Coin Change](https://leetcode.com/problems/coin-change/)\n- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)\n- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)\n- [Word Break Problem](https://leetcode.com/problems/word-break/)\n- [Combination Sum](https://leetcode.com/problems/combination-sum-iv/)\n- [House Robber](https://leetcode.com/problems/house-robber/)\n- [House Robber II](https://leetcode.com/problems/house-robber-ii/)\n- [Decode Ways](https://leetcode.com/problems/decode-ways/)\n- [Unique Paths](https://leetcode.com/problems/unique-paths/)\n- [Jump Game](https://leetcode.com/problems/jump-game/)	2022-07-16 17:10:57.546914+00	2022-07-17 09:33:05.863167+00	6	0	0	0	2	{dp}
3	Design Facebook : System Design Interview	Design a simple model of *Facebook* where people can add other people as friends. In addition, where people can post messages and that messages are visible on their friend's page. The design should be such that it can handle 10M of people. There may be, on an average 100 friends each person has. Every day each person posts around 10 messages on an average.\n\n**Use Case**\n- A user can create their own profile.\n- A user can add other users to his friend list.\n- Users can post messages to their timeline.\n- The system should display posts of friends to the display board/timeline.\n- People can like a post.\n- People can share their friends post to their own display board/timeline.\n**Constraints**\n- Consider a whole network of people as represented by a graph. Each person is a node and each friend\n- relationship is an edge of the graph.\n- Total number of distinct users / nodes: 10 million\n- Total number of distinct friend’s relationship / edges in the graph: 100 * 10 million\n- Number of messages posted by a single user per day: 10\n- Total number of messages posted by the whole network per day: 10 * 10 million	2022-07-16 17:03:16.965601+00	2022-07-16 17:48:15.172434+00	25	0	0	0	1	{motivation,interview}
4	Design URL Shortening service like TinyURL	# Problem\nDesign a service like TinyURL, a URL shortening service, a web service that provides short aliases for redirection of long URLs.\n\n# Solution\nIf you don't know about TinyURL, just check it. Basically we need a one to one mapping to get shorten URL which can retrieve original URL later. This will involve saving such data into database.\nWe should check the following things:\n- What's the traffic volume / length of the shortened URL?\n- What's the mapping function?\n- Single machine or multiple machines?	2022-07-16 17:06:30.511233+00	2022-07-16 17:47:40.995572+00	10	0	0	0	2	{"system design"}
6	Blind 75 LeetCode Questions	Hi folks,\n\nI found a list of Blind 75 Leetcode problems. Sharing it as I found it very useful.\n\nHappy Coding!\n\n- Array\n- Two Sum\n- Best Time to Buy and Sell Stock\n- Contains Duplicate\n- Product of Array Except Self\n- Maximum Subarray\n- Maximum Product Subarray\n- Find Minimum in Rotated Sorted Array\n- Search in Rotated Sorted Array	2022-07-16 17:09:41.150567+00	2022-07-16 17:48:36.62858+00	5	0	0	0	2	{}
8	Blind 75 Graph	### **Graph**\n\n- [Clone Graph](https://leetcode.com/problems/clone-graph/)\n- [Course Schedule](https://leetcode.com/problems/course-schedule/)\n- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)\n- [Number of Islands](https://leetcode.com/problems/number-of-islands/)\n- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)\n- [Alien Dictionary (Leetcode Premium)](https://leetcode.com/problems/alien-dictionary/)\n- [Graph Valid Tree (Leetcode Premium)](https://leetcode.com/problems/graph-valid-tree/)\n- [Number of Connected Components in an Undirected Graph (Leetcode Premium)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)	2022-07-16 17:17:08.83195+00	2022-07-16 17:48:45.902106+00	8	0	0	0	3	{graph}
9	Linked List Problems	### **Linked List**\n\n- [Reverse a Linked List](https://leetcode.com/problems/reverse-linked-list/)\n- [Detect Cycle in a Linked List](https://leetcode.com/problems/linked-list-cycle/)\n- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)\n- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)\n- [Remove Nth Node From End Of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)\n- [Reorder List](https://leetcode.com/problems/reorder-list/)	2022-07-16 17:18:19.782238+00	2022-07-16 17:48:53.035106+00	11	0	0	0	3	{"linked list"}
2	 Keep going | Interview Prep	**Struggle is real** - When I started off, I found it difficult to come up to the solution, when I was able to come up with a solution, I found it difficult to code. And I took my own sweet time to come get a hang of things. But, perseverance is the key. You have to go back and understand where you are lacking, sometimes these things don't come naturally to you, but failed OA’s, failed interview’s will in a way point you out to that direction. What I really recommend is - do MOCK technical interviews, spend quality time in understanding concepts in depth. Sometimes, you might understand the concept, but you would still fail in coding. You have to ace both the concepts, and implementation in your primary programming language.	2022-07-16 16:54:45.00635+00	2022-07-16 17:49:05.170503+00	13	0	0	0	1	{motivation,interview}
10	Matrix Problems	### **Matrix**\n\n- [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)\n- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)\n- [Rotate Image](https://leetcode.com/problems/rotate-image/)\n- [Word Search](https://leetcode.com/problems/word-search/)	2022-07-16 17:19:11.843264+00	2022-07-16 17:19:11.84333+00	0	0	0	0	3	{matrix}
11	String Problems	### **String**\n\n- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)\n- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)\n- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)\n- [Valid Anagram](https://leetcode.com/problems/valid-anagram/)\n- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)\n- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)\n- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)\n- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)\n- [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)\n- [Encode and Decode Strings (Leetcode Premium)](https://leetcode.com/problems/encode-and-decode-strings/)	2022-07-16 17:21:42.189235+00	2022-07-16 17:21:42.189294+00	0	0	0	0	3	{string}
12	System Design Interview	# Question\nthis is a question\n\n# Answer\nthis is an answer	2022-07-16 17:35:42.691281+00	2022-07-16 17:36:46.62265+00	0	0	0	0	3	{FAANG,"system design"}
14	Heap Questions	### **Heap**\n\n- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)\n- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)\n- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)	2022-07-16 17:44:26.575813+00	2022-07-16 17:44:26.577886+00	0	0	0	0	3	{algorithm,interview}
5	Algorithm you should know before system design	I collected the algorithm and example we may need during the system design on https://github.com/resumejob/system-design-algorithms\n\n- Frugal Streaming\n- Geohash / S2 Geometry\n- Leaky bucket / Token bucket\n- Loosy Counting\n- Operational transformation\n- Quadtree / Rtree\n- Ray casting\n- Reverse index\n- Rsync algorithm\n- Trie algorithm	2022-07-16 17:07:59.037422+00	2022-07-16 17:47:31.736171+00	32	0	0	0	2	{google,sort,interview,"linked list"}
1	Google Onsite LinkedList Question	Hi everyone, I encountered this problem during my Google Virtual Onsite Interview and still I could not figure out the Solution.\n\nGiven a Doubly Linked list, find a minimum number of API calls ( move()) to sort the given Linked List. we can only use the move() method to move the node value. We can iterate over the LinkedList elements as many times as we want but the task is to minimize the move() calls and sort the LinkedList.\n\nExample LinkedList 5 -> 2 -> 4 -> 3 -> 1 -> 6\n\nmove() - function takes node_val that you want to move and the position of where you want to place the node at. For example, if you want to pick node_val 5 and place it between 1 and 6 you can use move(5,1,6). The interviewer mentioned the move function is flexible and we can use an index as well to move the node. The way the function works is It would delete the node_val 5 and place it between 1 and 6 like this 2->4->3->1->5->6. This is defined as a 1 move() call.\n\nOur task is to minimize the move() call to sort the given LinkedList. For this linkedList 5 -> 2 -> 4 -> 3 -> 1 -> 6, minimum move() calll is 3 to sort the list.\n\n2->4->3->1->5->6 <-- move 1\n1->2->4->3->5->6 <-- move 2\n1->2->3->4->5->6 <-- move 3\n\nI could not come up with a solution for the above problem. Please let me know if you could build intuition. Also, this is my 1st post forgive me for any mistakes or I missed adding details.	2022-07-16 16:51:43.172169+00	2022-07-16 17:47:55.56588+00	15	0	0	0	1	{google,sort,interview,"linked list"}
13	Tree Problems	### **Tree**\n\n- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)\n- [Same Tree](https://leetcode.com/problems/same-tree/)\n- [Invert/Flip Binary Tree](https://leetcode.com/problems/invert-binary-tree/)\n- [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)\n- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)\n- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)\n- [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)\n- [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)\n- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)\n- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)\n- [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)\n- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)\n- [Add and Search Word](https://leetcode.com/problems/add-and-search-word-data-structure-design/)\n- [Word Search II](https://leetcode.com/problems/word-search-ii/)	2022-07-16 17:38:25.689836+00	2022-07-16 17:45:12.36619+00	0	0	0	0	3	{FAANG,algorithm,"system design"}
15	Blind 75 Part 2	I did 500+ LeetCode questions, created Blind 75, and interviewed hundreds of FAANG candidates. Frankly speaking, I don't think LeetCode is the best way to interview candidates, but the rules aren't set by us and the best we can do is to be better at this stupid game together.\nSo here are some tips for you on how to get better at LeetCode:\n\n- Revise your CS fundamentals before your start LeetCoding. You don't have to spend that much time studying, but you need to know the advantages of each data structure and when to use which for the question.\n- The average question difficulty you'll get is Medium. Start with Easy questions, do more of them, move on to Medium questions. You probably won't be asked Hard questions in real interviews but you should do some famous Hard questions like Word ladder, serialize/deserialize Binary tree and trapping rain water. You should not be practicing only Easy questions.\n\n\nA paragraph with *emphasis* and **strong importance**.\n\n> A block quote with ~strikethrough~ and a URL: https://reactjs.org.\n\n* Lists\n* [ ] todo\n* [x] done\n\nA table:\n\n| a | b |\n| - | - |\n\nCode:\n~~~js\nfunction(x) {\n  return x;\n}\n~~~\n	2022-07-17 03:38:29.891616+00	2022-07-17 03:38:29.891654+00	0	0	0	0	3	{leetcode,interview,FAANG,coding}
16	DP Again	### **Dynamic Programming**\n\n- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)\n- [Coin Change](https://leetcode.com/problems/coin-change/)\n- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)\n- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)\n- [Word Break Problem](https://leetcode.com/problems/word-break/)\n- [Combination Sum](https://leetcode.com/problems/combination-sum-iv/)\n- [House Robber](https://leetcode.com/problems/house-robber/)\n- [House Robber II](https://leetcode.com/problems/house-robber-ii/)\n- [Decode Ways](https://leetcode.com/problems/decode-ways/)\n- [Unique Paths](https://leetcode.com/problems/unique-paths/)\n- [Jump Game](https://leetcode.com/problems/jump-game/)	2022-07-17 07:47:53.613482+00	2022-07-17 07:47:53.613551+00	0	0	0	0	1	{dp,algorithm}
17	A sample title	# Post title\n- point 1\n- point 2\n- point 3	2022-07-17 09:34:10.297338+00	2022-07-17 09:34:10.297479+00	0	0	0	0	1	{algorithm,graph}
18	Blind 75 Part 4	I did 500+ LeetCode questions, created Blind 75, and interviewed hundreds of FAANG candidates. Frankly speaking, I don't think LeetCode is the best way to interview candidates, but the rules aren't set by us and the best we can do is to be better at this stupid game together.\nSo here are some tips for you on how to get better at LeetCode:\n\n- Revise your CS fundamentals before your start LeetCoding. You don't have to spend that much time studying, but you need to know the advantages of each data structure and when to use which for the question.\n- The average question difficulty you'll get is Medium. Start with Easy questions, do more of them, move on to Medium questions. You probably won't be asked Hard questions in real interviews but you should do some famous Hard questions like Word ladder, serialize/deserialize Binary tree and trapping rain water. You should not be practicing only Easy questions.\n\n\nA paragraph with *emphasis* and **strong importance**.\n\n> A block quote with ~strikethrough~ and a URL: https://reactjs.org.\n\n* Lists\n* [ ] todo\n* [x] done\n\nA table:\n\n| a | b |\n| - | - |\n\nCode:\n~~~js\nfunction(x) {\n  return x;\n}\n~~~\n	2022-07-31 09:05:54.463425+00	2022-07-31 09:05:54.463454+00	0	0	0	0	1	{leetcode,interview,FAANG,coding}
\.


--
-- Data for Name: discussions_downvoted; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.discussions_downvoted (id, discussion_id, user_id) FROM stdin;
\.


--
-- Data for Name: discussions_upvoted; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.discussions_upvoted (id, discussion_id, user_id) FROM stdin;
1	2	3
2	7	3
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	authtoken	token
8	authtoken	tokenproxy
9	discussions	discussion
10	discussions	comments
11	discussions	upvoted
12	discussions	downvoted
13	users	user
14	problems	category
15	problems	company
16	problems	problem
17	problems	role
18	problems	subcategory
19	problems	solution
20	problems	inputoutput
21	problems	bookmark
22	assessments	assessment
23	assessments	option
24	assessments	question
25	assessments	quesoption
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2022-07-16 16:49:27.544937+00
2	auth	0001_initial	2022-07-16 16:49:27.745968+00
3	admin	0001_initial	2022-07-16 16:49:27.80103+00
4	admin	0002_logentry_remove_auto_add	2022-07-16 16:49:27.817072+00
5	admin	0003_logentry_add_action_flag_choices	2022-07-16 16:49:27.837383+00
6	contenttypes	0002_remove_content_type_name	2022-07-16 16:49:27.874985+00
7	auth	0002_alter_permission_name_max_length	2022-07-16 16:49:27.912875+00
8	auth	0003_alter_user_email_max_length	2022-07-16 16:49:27.938291+00
9	auth	0004_alter_user_username_opts	2022-07-16 16:49:27.955664+00
10	auth	0005_alter_user_last_login_null	2022-07-16 16:49:27.969064+00
11	auth	0006_require_contenttypes_0002	2022-07-16 16:49:27.974998+00
12	auth	0007_alter_validators_add_error_messages	2022-07-16 16:49:27.987781+00
13	auth	0008_alter_user_username_max_length	2022-07-16 16:49:28.012227+00
14	auth	0009_alter_user_last_name_max_length	2022-07-16 16:49:28.032264+00
15	auth	0010_alter_group_name_max_length	2022-07-16 16:49:28.055734+00
16	auth	0011_update_proxy_permissions	2022-07-16 16:49:28.069669+00
17	auth	0012_alter_user_first_name_max_length	2022-07-16 16:49:28.089227+00
18	authtoken	0001_initial	2022-07-16 16:49:28.167806+00
19	authtoken	0002_auto_20160226_1747	2022-07-16 16:49:28.227031+00
20	authtoken	0003_tokenproxy	2022-07-16 16:49:28.23355+00
21	discussions	0001_initial	2022-07-16 16:49:28.29545+00
22	discussions	0002_comments	2022-07-16 16:49:28.33531+00
23	discussions	0003_comments_parent	2022-07-16 16:49:28.359637+00
24	discussions	0004_discussion_user	2022-07-16 16:49:28.398228+00
25	discussions	0005_comments_user	2022-07-16 16:49:28.435616+00
26	discussions	0006_comments_hash	2022-07-16 16:49:28.46036+00
27	discussions	0007_alter_comments_parent	2022-07-16 16:49:28.528899+00
28	discussions	0008_upvoted	2022-07-16 16:49:28.588084+00
29	discussions	0009_downvoted	2022-07-16 16:49:28.643091+00
30	discussions	0010_discussion_tags	2022-07-16 16:49:28.668653+00
31	sessions	0001_initial	2022-07-16 16:49:28.708178+00
32	users	0001_initial	2022-07-16 16:49:28.72759+00
33	users	0002_delete_user	2022-07-16 16:49:28.736792+00
34	users	0003_initial	2022-07-16 16:49:28.790819+00
35	problems	0001_initial	2022-07-31 00:28:53.996365+00
36	problems	0002_alter_problem_companies_alter_problem_roles_and_more	2022-07-31 00:28:54.102149+00
37	problems	0003_alter_inputoutput_problem	2022-07-31 00:28:54.144703+00
38	problems	0004_alter_inputoutput_problem	2022-07-31 00:28:54.183019+00
39	problems	0005_remove_problem_companies_remove_problem_roles_and_more	2022-07-31 00:28:54.291756+00
40	problems	0006_problem_companies	2022-07-31 00:28:54.368474+00
41	problems	0007_problem_roles_problem_subcategories	2022-07-31 00:28:54.49022+00
42	problems	0008_alter_problem_memory_limit_alter_problem_time_limit	2022-07-31 00:28:54.565806+00
43	assessments	0001_initial	2022-07-31 03:44:03.104715+00
44	assessments	0002_assessment_roles_assessment_subcategories_and_more	2022-07-31 03:44:03.382804+00
45	assessments	0003_assessment_image_link	2022-07-31 03:44:03.402617+00
46	assessments	0004_remove_question_image_link	2022-07-31 03:44:03.423117+00
47	assessments	0005_remove_option_image_link	2022-07-31 03:44:03.43931+00
48	assessments	0006_remove_assessment_subcategories_and_more	2022-07-31 03:44:03.610357+00
49	users	0004_user_languages_user_skills	2022-08-25 07:52:44.306875+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: problems_bookmark; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_bookmark (id, date_added, problem_id, user_id) FROM stdin;
\.


--
-- Data for Name: problems_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_category (id, name, description) FROM stdin;
1	dsa	
\.


--
-- Data for Name: problems_company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_company (id, name, description) FROM stdin;
1	apple	
2	Google	Alphabet Inc.
\.


--
-- Data for Name: problems_inputoutput; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_inputoutput (id, input, output, points, problem_id) FROM stdin;
1	in1.txt	out1.txt	10	1
\.


--
-- Data for Name: problems_problem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_problem (id, name, description, time_limit, memory_limit, difficulty, submission_count, solve_count) FROM stdin;
1	Test Name	# Hello World\n- point 1\n- point 2	2.00	258	Easy	0	0
\.


--
-- Data for Name: problems_problem_companies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_problem_companies (id, problem_id, company_id) FROM stdin;
1	1	1
2	1	2
\.


--
-- Data for Name: problems_problem_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_problem_roles (id, problem_id, role_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: problems_problem_subcategories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_problem_subcategories (id, problem_id, subcategory_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: problems_role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_role (id, name, description) FROM stdin;
1	swe	
2	{'id': 19, 'name': 'Machine Learning Engineer', 'description': ''}	
3	{'id': 20, 'name': ' Data Analyst', 'description': ''}	
4	{'id': 21, 'name': ' Project Manager', 'description': ''}	
5	Machine Learning Engineer	
6	Data Analyst	
\.


--
-- Data for Name: problems_solution; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_solution (id, code, language, runtime, memory_usage, solve_status, problem_id, user_id) FROM stdin;
1	int x = 5;	c			Pending	1	1
2	int x = 5; int y = 10;	c			Pending	1	1
3	int z = 1444;	c			Pending	1	1
4	int x = 5; int y = 10;	c			Pending	1	1
5	int x = 5; int y = 10; int a = 110;	c			Pending	1	1
6	int x = 5; int y = 10; int a = 110;\r\nint d = 2312;	c			Pending	1	1
7	int x = 5; int y = 10; int a = 110;\r\nint d = 2312;\r\nint z = 12312;	c			Pending	1	1
8	int x = 5; int y = 10; int a = 110;\r\nint d = 2312;\r\nint z = 12312;\r\nint f = 213;	c			Pending	1	1
9	int x = 5; int y = 10; int a = 110;\r\nint d = 2312;\r\nint z = 12312;\r\nint f = 213;	c			Pending	1	1
10	int x = 5; int y = 10; int a = 110;\r\nint d = 2312;\r\nint z = 12312;\r\nint f = 213;\r\nint djhfas = 123;	c			Pending	1	1
11	int z = 123;	c			Pending	1	2
\.


--
-- Data for Name: problems_subcategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.problems_subcategory (id, name, description, category_id) FROM stdin;
1	tree		1
\.


--
-- Data for Name: users_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_user (user_ptr_id, city, country, about, occupation, current_workplace, website_link, github_link, languages, skills) FROM stdin;
3								\N	\N
4								\N	\N
1							ramisa2108	\N	\N
5								\N	\N
2	Dhaka	Bangladesh	FaHa	Lecturer @ CSE BUET	BUET	fahim_hakim.github.io	fahim_hakim	{c++,java}	{DP,"Data Structure",Algorithm}
\.


--
-- Name: assessments_assessment_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_assessment_categories_id_seq', 1, false);


--
-- Name: assessments_assessment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_assessment_id_seq', 4, true);


--
-- Name: assessments_assessment_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_assessment_roles_id_seq', 10, true);


--
-- Name: assessments_option_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_option_id_seq', 1, false);


--
-- Name: assessments_quesoption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_quesoption_id_seq', 1, false);


--
-- Name: assessments_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_question_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 100, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 5, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: discussions_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.discussions_comments_id_seq', 9, true);


--
-- Name: discussions_discussion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.discussions_discussion_id_seq', 18, true);


--
-- Name: discussions_downvoted_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.discussions_downvoted_id_seq', 1, true);


--
-- Name: discussions_upvoted_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.discussions_upvoted_id_seq', 3, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 25, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 49, true);


--
-- Name: problems_bookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_bookmark_id_seq', 1, false);


--
-- Name: problems_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_category_id_seq', 1, true);


--
-- Name: problems_company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_company_id_seq', 2, true);


--
-- Name: problems_inputoutput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_inputoutput_id_seq', 1, true);


--
-- Name: problems_problem_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_problem_companies_id_seq', 3, true);


--
-- Name: problems_problem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_problem_id_seq', 1, true);


--
-- Name: problems_problem_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_problem_roles_id_seq', 1, true);


--
-- Name: problems_problem_subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_problem_subcategories_id_seq', 1, true);


--
-- Name: problems_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_role_id_seq', 6, true);


--
-- Name: problems_solution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_solution_id_seq', 11, true);


--
-- Name: problems_subcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.problems_subcategory_id_seq', 1, true);


--
-- Name: assessments_assessment_categories assessments_assessment_c_assessment_id_category_i_a39850b4_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_categories
    ADD CONSTRAINT assessments_assessment_c_assessment_id_category_i_a39850b4_uniq UNIQUE (assessment_id, category_id);


--
-- Name: assessments_assessment_categories assessments_assessment_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_categories
    ADD CONSTRAINT assessments_assessment_categories_pkey PRIMARY KEY (id);


--
-- Name: assessments_assessment assessments_assessment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment
    ADD CONSTRAINT assessments_assessment_pkey PRIMARY KEY (id);


--
-- Name: assessments_assessment_roles assessments_assessment_r_assessment_id_role_id_48a76d7a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_roles
    ADD CONSTRAINT assessments_assessment_r_assessment_id_role_id_48a76d7a_uniq UNIQUE (assessment_id, role_id);


--
-- Name: assessments_assessment_roles assessments_assessment_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_roles
    ADD CONSTRAINT assessments_assessment_roles_pkey PRIMARY KEY (id);


--
-- Name: assessments_option assessments_option_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_option
    ADD CONSTRAINT assessments_option_pkey PRIMARY KEY (id);


--
-- Name: assessments_quesoption assessments_quesoption_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_quesoption
    ADD CONSTRAINT assessments_quesoption_pkey PRIMARY KEY (id);


--
-- Name: assessments_question assessments_question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_question
    ADD CONSTRAINT assessments_question_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: discussions_comments discussions_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_comments
    ADD CONSTRAINT discussions_comments_pkey PRIMARY KEY (id);


--
-- Name: discussions_discussion discussions_discussion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_discussion
    ADD CONSTRAINT discussions_discussion_pkey PRIMARY KEY (id);


--
-- Name: discussions_downvoted discussions_downvoted_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_downvoted
    ADD CONSTRAINT discussions_downvoted_pkey PRIMARY KEY (id);


--
-- Name: discussions_upvoted discussions_upvoted_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_upvoted
    ADD CONSTRAINT discussions_upvoted_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: problems_bookmark problems_bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_bookmark
    ADD CONSTRAINT problems_bookmark_pkey PRIMARY KEY (id);


--
-- Name: problems_category problems_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_category
    ADD CONSTRAINT problems_category_pkey PRIMARY KEY (id);


--
-- Name: problems_company problems_company_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_company
    ADD CONSTRAINT problems_company_pkey PRIMARY KEY (id);


--
-- Name: problems_inputoutput problems_inputoutput_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_inputoutput
    ADD CONSTRAINT problems_inputoutput_pkey PRIMARY KEY (id);


--
-- Name: problems_problem_companies problems_problem_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_companies
    ADD CONSTRAINT problems_problem_companies_pkey PRIMARY KEY (id);


--
-- Name: problems_problem_companies problems_problem_companies_problem_id_company_id_139482c3_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_companies
    ADD CONSTRAINT problems_problem_companies_problem_id_company_id_139482c3_uniq UNIQUE (problem_id, company_id);


--
-- Name: problems_problem problems_problem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem
    ADD CONSTRAINT problems_problem_pkey PRIMARY KEY (id);


--
-- Name: problems_problem_roles problems_problem_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_roles
    ADD CONSTRAINT problems_problem_roles_pkey PRIMARY KEY (id);


--
-- Name: problems_problem_roles problems_problem_roles_problem_id_role_id_8e4c921f_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_roles
    ADD CONSTRAINT problems_problem_roles_problem_id_role_id_8e4c921f_uniq UNIQUE (problem_id, role_id);


--
-- Name: problems_problem_subcategories problems_problem_subcate_problem_id_subcategory_i_8024c4a4_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_subcategories
    ADD CONSTRAINT problems_problem_subcate_problem_id_subcategory_i_8024c4a4_uniq UNIQUE (problem_id, subcategory_id);


--
-- Name: problems_problem_subcategories problems_problem_subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_subcategories
    ADD CONSTRAINT problems_problem_subcategories_pkey PRIMARY KEY (id);


--
-- Name: problems_role problems_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_role
    ADD CONSTRAINT problems_role_pkey PRIMARY KEY (id);


--
-- Name: problems_solution problems_solution_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_solution
    ADD CONSTRAINT problems_solution_pkey PRIMARY KEY (id);


--
-- Name: problems_subcategory problems_subcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_subcategory
    ADD CONSTRAINT problems_subcategory_pkey PRIMARY KEY (id);


--
-- Name: users_user users_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_pkey PRIMARY KEY (user_ptr_id);


--
-- Name: assessments_assessment_categories_assessment_id_bd0ae8fa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_assessment_categories_assessment_id_bd0ae8fa ON public.assessments_assessment_categories USING btree (assessment_id);


--
-- Name: assessments_assessment_categories_category_id_8ed2a4fa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_assessment_categories_category_id_8ed2a4fa ON public.assessments_assessment_categories USING btree (category_id);


--
-- Name: assessments_assessment_roles_assessment_id_ba5f8115; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_assessment_roles_assessment_id_ba5f8115 ON public.assessments_assessment_roles USING btree (assessment_id);


--
-- Name: assessments_assessment_roles_role_id_f6ee4e3b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_assessment_roles_role_id_f6ee4e3b ON public.assessments_assessment_roles USING btree (role_id);


--
-- Name: assessments_quesoption_option_id_d298963d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_quesoption_option_id_d298963d ON public.assessments_quesoption USING btree (option_id);


--
-- Name: assessments_quesoption_question_id_0233bee8; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_quesoption_question_id_0233bee8 ON public.assessments_quesoption USING btree (question_id);


--
-- Name: assessments_question_assessment_id_165f6d6d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX assessments_question_assessment_id_165f6d6d ON public.assessments_question USING btree (assessment_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: discussions_comments_discussion_id_f90e1469; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_comments_discussion_id_f90e1469 ON public.discussions_comments USING btree (discussion_id);


--
-- Name: discussions_comments_user_id_264c0caa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_comments_user_id_264c0caa ON public.discussions_comments USING btree (user_id);


--
-- Name: discussions_discussion_user_id_243d8c0b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_discussion_user_id_243d8c0b ON public.discussions_discussion USING btree (user_id);


--
-- Name: discussions_downvoted_discussion_id_94acc25e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_downvoted_discussion_id_94acc25e ON public.discussions_downvoted USING btree (discussion_id);


--
-- Name: discussions_downvoted_user_id_ce7b0bbe; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_downvoted_user_id_ce7b0bbe ON public.discussions_downvoted USING btree (user_id);


--
-- Name: discussions_upvoted_discussion_id_39235d74; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_upvoted_discussion_id_39235d74 ON public.discussions_upvoted USING btree (discussion_id);


--
-- Name: discussions_upvoted_user_id_f8233b27; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX discussions_upvoted_user_id_f8233b27 ON public.discussions_upvoted USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: problems_bookmark_problem_id_9ee2c82f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_bookmark_problem_id_9ee2c82f ON public.problems_bookmark USING btree (problem_id);


--
-- Name: problems_bookmark_user_id_550f864e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_bookmark_user_id_550f864e ON public.problems_bookmark USING btree (user_id);


--
-- Name: problems_inputoutput_problem_id_9dd618b3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_inputoutput_problem_id_9dd618b3 ON public.problems_inputoutput USING btree (problem_id);


--
-- Name: problems_problem_companies_company_id_62f5fe1d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_companies_company_id_62f5fe1d ON public.problems_problem_companies USING btree (company_id);


--
-- Name: problems_problem_companies_problem_id_496e4620; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_companies_problem_id_496e4620 ON public.problems_problem_companies USING btree (problem_id);


--
-- Name: problems_problem_roles_problem_id_52d6434b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_roles_problem_id_52d6434b ON public.problems_problem_roles USING btree (problem_id);


--
-- Name: problems_problem_roles_role_id_6ee93c61; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_roles_role_id_6ee93c61 ON public.problems_problem_roles USING btree (role_id);


--
-- Name: problems_problem_subcategories_problem_id_63c721e1; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_subcategories_problem_id_63c721e1 ON public.problems_problem_subcategories USING btree (problem_id);


--
-- Name: problems_problem_subcategories_subcategory_id_703d70cc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_problem_subcategories_subcategory_id_703d70cc ON public.problems_problem_subcategories USING btree (subcategory_id);


--
-- Name: problems_solution_problem_id_2d4e6e8e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_solution_problem_id_2d4e6e8e ON public.problems_solution USING btree (problem_id);


--
-- Name: problems_solution_user_id_1d693e38; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_solution_user_id_1d693e38 ON public.problems_solution USING btree (user_id);


--
-- Name: problems_subcategory_category_id_fda38037; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX problems_subcategory_category_id_fda38037 ON public.problems_subcategory USING btree (category_id);


--
-- Name: assessments_assessment_roles assessments_assessme_assessment_id_ba5f8115_fk_assessmen; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_roles
    ADD CONSTRAINT assessments_assessme_assessment_id_ba5f8115_fk_assessmen FOREIGN KEY (assessment_id) REFERENCES public.assessments_assessment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_assessment_categories assessments_assessme_assessment_id_bd0ae8fa_fk_assessmen; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_categories
    ADD CONSTRAINT assessments_assessme_assessment_id_bd0ae8fa_fk_assessmen FOREIGN KEY (assessment_id) REFERENCES public.assessments_assessment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_assessment_categories assessments_assessme_category_id_8ed2a4fa_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_categories
    ADD CONSTRAINT assessments_assessme_category_id_8ed2a4fa_fk_problems_ FOREIGN KEY (category_id) REFERENCES public.problems_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_assessment_roles assessments_assessme_role_id_f6ee4e3b_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_assessment_roles
    ADD CONSTRAINT assessments_assessme_role_id_f6ee4e3b_fk_problems_ FOREIGN KEY (role_id) REFERENCES public.problems_role(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_quesoption assessments_quesopti_option_id_d298963d_fk_assessmen; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_quesoption
    ADD CONSTRAINT assessments_quesopti_option_id_d298963d_fk_assessmen FOREIGN KEY (option_id) REFERENCES public.assessments_option(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_quesoption assessments_quesopti_question_id_0233bee8_fk_assessmen; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_quesoption
    ADD CONSTRAINT assessments_quesopti_question_id_0233bee8_fk_assessmen FOREIGN KEY (question_id) REFERENCES public.assessments_question(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assessments_question assessments_question_assessment_id_165f6d6d_fk_assessmen; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments_question
    ADD CONSTRAINT assessments_question_assessment_id_165f6d6d_fk_assessmen FOREIGN KEY (assessment_id) REFERENCES public.assessments_assessment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_comments discussions_comments_discussion_id_f90e1469_fk_discussio; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_comments
    ADD CONSTRAINT discussions_comments_discussion_id_f90e1469_fk_discussio FOREIGN KEY (discussion_id) REFERENCES public.discussions_discussion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_comments discussions_comments_user_id_264c0caa_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_comments
    ADD CONSTRAINT discussions_comments_user_id_264c0caa_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_discussion discussions_discussion_user_id_243d8c0b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_discussion
    ADD CONSTRAINT discussions_discussion_user_id_243d8c0b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_downvoted discussions_downvote_discussion_id_94acc25e_fk_discussio; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_downvoted
    ADD CONSTRAINT discussions_downvote_discussion_id_94acc25e_fk_discussio FOREIGN KEY (discussion_id) REFERENCES public.discussions_discussion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_downvoted discussions_downvoted_user_id_ce7b0bbe_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_downvoted
    ADD CONSTRAINT discussions_downvoted_user_id_ce7b0bbe_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_upvoted discussions_upvoted_discussion_id_39235d74_fk_discussio; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_upvoted
    ADD CONSTRAINT discussions_upvoted_discussion_id_39235d74_fk_discussio FOREIGN KEY (discussion_id) REFERENCES public.discussions_discussion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: discussions_upvoted discussions_upvoted_user_id_f8233b27_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions_upvoted
    ADD CONSTRAINT discussions_upvoted_user_id_f8233b27_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_bookmark problems_bookmark_problem_id_9ee2c82f_fk_problems_problem_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_bookmark
    ADD CONSTRAINT problems_bookmark_problem_id_9ee2c82f_fk_problems_problem_id FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_bookmark problems_bookmark_user_id_550f864e_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_bookmark
    ADD CONSTRAINT problems_bookmark_user_id_550f864e_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_inputoutput problems_inputoutput_problem_id_9dd618b3_fk_problems_problem_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_inputoutput
    ADD CONSTRAINT problems_inputoutput_problem_id_9dd618b3_fk_problems_problem_id FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_companies problems_problem_com_company_id_62f5fe1d_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_companies
    ADD CONSTRAINT problems_problem_com_company_id_62f5fe1d_fk_problems_ FOREIGN KEY (company_id) REFERENCES public.problems_company(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_companies problems_problem_com_problem_id_496e4620_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_companies
    ADD CONSTRAINT problems_problem_com_problem_id_496e4620_fk_problems_ FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_roles problems_problem_rol_problem_id_52d6434b_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_roles
    ADD CONSTRAINT problems_problem_rol_problem_id_52d6434b_fk_problems_ FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_roles problems_problem_roles_role_id_6ee93c61_fk_problems_role_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_roles
    ADD CONSTRAINT problems_problem_roles_role_id_6ee93c61_fk_problems_role_id FOREIGN KEY (role_id) REFERENCES public.problems_role(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_subcategories problems_problem_sub_problem_id_63c721e1_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_subcategories
    ADD CONSTRAINT problems_problem_sub_problem_id_63c721e1_fk_problems_ FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_problem_subcategories problems_problem_sub_subcategory_id_703d70cc_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_problem_subcategories
    ADD CONSTRAINT problems_problem_sub_subcategory_id_703d70cc_fk_problems_ FOREIGN KEY (subcategory_id) REFERENCES public.problems_subcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_solution problems_solution_problem_id_2d4e6e8e_fk_problems_problem_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_solution
    ADD CONSTRAINT problems_solution_problem_id_2d4e6e8e_fk_problems_problem_id FOREIGN KEY (problem_id) REFERENCES public.problems_problem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_solution problems_solution_user_id_1d693e38_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_solution
    ADD CONSTRAINT problems_solution_user_id_1d693e38_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: problems_subcategory problems_subcategory_category_id_fda38037_fk_problems_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.problems_subcategory
    ADD CONSTRAINT problems_subcategory_category_id_fda38037_fk_problems_ FOREIGN KEY (category_id) REFERENCES public.problems_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_user users_user_user_ptr_id_dad4eb89_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_user_ptr_id_dad4eb89_fk_auth_user_id FOREIGN KEY (user_ptr_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

